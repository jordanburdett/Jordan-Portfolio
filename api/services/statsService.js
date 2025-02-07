class StatsService {
  constructor(collection) {
    this.collection = collection;
  }

  async getAggregatedStats(filters = {}) {
    const pipeline = this.buildPipeline(filters);
    const result = await this.collection.aggregate(pipeline).next();
    return result || this.getDefaultStatsResponse();
  }

  buildPipeline({ startDate, endDate, dimensionFilters } = {}) {
    const dateMatch = this.buildDateFilter(startDate, endDate);
    const dimensionMatches = this.buildDimensionFilters(dimensionFilters);

    return [
      ...dateMatch ? [{ $match: dateMatch }] : [],
      {
        $addFields: {
          timestampDate: {
            $dateFromString: {
              dateString: "$timestamp",
              onError: new Date(0)
            }
          }
        }
      },
      {
        $facet: {
          overview: [this.overviewStats()],
          visitsByCountry: [this.visitsByDimension('locationInfo.country')],
          visitsByDevice: [this.visitsByDimension('deviceInfo.deviceType')],
          visitsByRoute: [this.visitsByDimension('route')],
          dailyVisits: this.dailyVisitsStats()
        }
      },
      {
        $project: {
          totalVisits: {
            $ifNull: [{ $arrayElemAt: ["$overview.totalVisits", 0] }, 0]
          },
          uniqueVisitors: {
            $ifNull: [{ $size: { $arrayElemAt: ["$overview.uniqueVisitors", 0] } }, 0]
          },
          averageTimeSpent: {
            $let: {
              vars: {
                totalTimeSpent: { $arrayElemAt: ["$overview.totalTimeSpent", 0] },
                totalVisits: { $arrayElemAt: ["$overview.totalVisits", 0] }
              },
              in: {
                $cond: {
                  if: { $gt: ["$$totalVisits", 0] },
                  then: { $divide: ["$$totalTimeSpent", "$$totalVisits"] },
                  else: 0
                }
              }
            }
          },
          visitsByCountry: {
            $ifNull: [{
              $arrayToObject: {
                $map: {
                  input: "$visitsByCountry",
                  as: "country",
                  in: {
                    k: { $ifNull: ["$$country._id", "Unknown"] },
                    v: "$$country.count"
                  }
                }
              }
            }, {}]
          },
          visitsByDevice: {
            $ifNull: [{
              $arrayToObject: {
                $map: {
                  input: "$visitsByDevice",
                  as: "device",
                  in: {
                    k: { $ifNull: ["$$device._id", "Unknown"] },
                    v: "$$device.count"
                  }
                }
              }
            }, {}]
          },
          visitsByRoute: {
            $ifNull: [{
              $arrayToObject: {
                $map: {
                  input: "$visitsByRoute",
                  as: "route",
                  in: {
                    k: { $ifNull: ["$$route._id", "/"] },
                    v: "$$route.count"
                  }
                }
              }
            }, {}]
          },
          dailyVisits: {
            $ifNull: [{
              $map: {
                input: "$dailyVisits",
                as: "day",
                in: {
                  date: "$$day._id",
                  visits: "$$day.visits"
                }
              }
            }, []]
          }
        }
      }
    ];
  }

  buildDateFilter(startDate, endDate) {
    if (!startDate && !endDate) return null;

    const dateFilter = {};
    if (startDate) {
      dateFilter['$gte'] = new Date(startDate);
    }
    if (endDate) {
      dateFilter['$lte'] = new Date(endDate);
    }

    return { timestampDate: dateFilter };
  }

  buildDimensionFilters(filters = {}) {
    const matches = [];
    if (!filters) return matches;

    Object.entries(filters).forEach(([dimension, value]) => {
      switch (dimension) {
        case 'country':
          matches.push({ $match: { 'locationInfo.country': value } });
          break;
        case 'deviceType':
          matches.push({ $match: { 'deviceInfo.deviceType': value } });
          break;
        case 'route':
          matches.push({ $match: { route: value } });
          break;
      }
    });

    return matches;
  }

  overviewStats() {
    return {
      $group: {
        _id: null,
        totalVisits: { $sum: 1 },
        uniqueVisitors: { $addToSet: '$sessionId' },
        totalTimeSpent: { $sum: '$timeSpent' }
      }
    };
  }

  visitsByDimension(dimensionPath) {
    return {
      $group: {
        _id: `$${dimensionPath}`,
        count: { $sum: 1 }
      }
    };
  }

  dailyVisitsStats() {
    return [
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$timestampDate'
            }
          },
          visits: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ];
  }

  getDefaultStatsResponse() {
    return {
      totalVisits: 0,
      uniqueVisitors: 0,
      averageTimeSpent: 0,
      visitsByCountry: {},
      visitsByDevice: {},
      visitsByRoute: {},
      dailyVisits: []
    };
  }
}

module.exports = StatsService;
