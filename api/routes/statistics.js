const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const connectToCollection = async (collectionName) => {
  try {
    return await db.collection(collectionName);
  } catch (error) {
    console.error(`Error connecting to collection ${collectionName}:`, error);
    throw error;
  }
};

// Get aggregated statistics
router.get('/', async (req, res) => {
  try {
    const statsCollection = await connectToCollection('statistics');
    
    const pipeline = [
      {
        $addFields: {
          // Convert timestamp string to Date object
          timestampDate: { 
            $dateFromString: { 
              dateString: "$timestamp",
              onError: new Date(0) // fallback date if parsing fails
            } 
          }
        }
      },
      {
        $facet: {
          // Total visits and unique visitors
          overview: [
            {
              $group: {
                _id: null,
                totalVisits: { $sum: 1 },
                uniqueVisitors: { $addToSet: '$sessionId' },
                totalTimeSpent: { $sum: '$timeSpent' }
              }
            }
          ],
          // Visits by country
          visitsByCountry: [
            {
              $group: {
                _id: '$locationInfo.country',
                count: { $sum: 1 }
              }
            }
          ],
          // Visits by device
          visitsByDevice: [
            {
              $group: {
                _id: '$deviceInfo.deviceType',
                count: { $sum: 1 }
              }
            }
          ],
          // Visits by route
          visitsByRoute: [
            {
              $group: {
                _id: '$route',
                count: { $sum: 1 }
              }
            }
          ],
          // Daily visits
          dailyVisits: [
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
            {
              $sort: { _id: 1 }
            }
          ]
        }
      },
      // Transform the results into the expected format
      {
        $project: {
          totalVisits: { 
            $ifNull: [
              { $arrayElemAt: ['$overview.totalVisits', 0] },
              0
            ]
          },
          uniqueVisitors: { 
            $ifNull: [
              { $size: { $arrayElemAt: ['$overview.uniqueVisitors', 0] } },
              0
            ]
          },
          averageTimeSpent: {
            $ifNull: [
              {
                $divide: [
                  { $arrayElemAt: ['$overview.totalTimeSpent', 0] },
                  { $arrayElemAt: ['$overview.totalVisits', 0] }
                ]
              },
              0
            ]
          },
          visitsByCountry: {
            $ifNull: [
              {
                $arrayToObject: {
                  $map: {
                    input: '$visitsByCountry',
                    as: 'country',
                    in: {
                      k: { $ifNull: ['$$country._id', 'Unknown'] },
                      v: '$$country.count'
                    }
                  }
                }
              },
              {}
            ]
          },
          visitsByDevice: {
            $ifNull: [
              {
                $arrayToObject: {
                  $map: {
                    input: '$visitsByDevice',
                    as: 'device',
                    in: {
                      k: { $ifNull: ['$$device._id', 'Unknown'] },
                      v: '$$device.count'
                    }
                  }
                }
              },
              {}
            ]
          },
          visitsByRoute: {
            $ifNull: [
              {
                $arrayToObject: {
                  $map: {
                    input: '$visitsByRoute',
                    as: 'route',
                    in: {
                      k: { $ifNull: ['$$route._id', '/'] },
                      v: '$$route.count'
                    }
                  }
                }
              },
              {}
            ]
          },
          dailyVisits: {
            $ifNull: [
              {
                $map: {
                  input: '$dailyVisits',
                  as: 'day',
                  in: {
                    date: '$$day._id',
                    visits: '$$day.visits'
                  }
                }
              },
              []
            ]
          }
        }
      }
    ];

    const result = await statsCollection.aggregate(pipeline).next();
    
    if (!result) {
      return res.json({
        totalVisits: 0,
        uniqueVisitors: 0,
        averageTimeSpent: 0,
        visitsByCountry: {},
        visitsByDevice: {},
        visitsByRoute: {},
        dailyVisits: []
      });
    }

    res.json(result);
  } catch (error) {
    console.error('Error getting statistics:', error);
    res.status(500).json({
      error: 'Failed to fetch statistics',
      details: error.message
    });
  }
});

// Get location data from IP
router.get('/location', async (req, res) => {
  try {
    // Get client IP from request headers or socket
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    // For development, return mock data if localhost
    if (ip === '::1' || ip === '127.0.0.1' || ip.includes('localhost')) {
      return res.json({
        country: 'United States',
        city: 'Local Development',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
    }

    // For production, make the call to ipapi.co from the backend
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    
    res.json({
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown',
      timezone: data.timezone || 'UTC'
    });
  } catch (error) {
    console.error('Error getting location:', error);
    res.json({
      country: 'Unknown',
      city: 'Unknown',
      timezone: 'UTC'
    });
  }
});

// Record a new page visit
router.post('/visit', async (req, res) => {
  try {
    const statsCollection = await connectToCollection('statistics');
    const visit = {
      ...req.body,
      timestamp: new Date().toISOString() // Ensure timestamp is stored as ISO string
    };
    await statsCollection.insertOne(visit);
    res.json({ success: true });
  } catch (error) {
    console.error('Error recording visit:', error);
    res.status(500).json({ error: 'Failed to record visit' });
  }
});

// Update time spent on a page
router.post('/time', async (req, res) => {
  try {
    const { sessionId, route, timeSpent } = req.body;
    const statsCollection = await connectToCollection('statistics');
    
    await statsCollection.updateOne(
      { sessionId, route },
      { $set: { timeSpent } }
    );
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating time spent:', error);
    res.status(500).json({ error: 'Failed to update time spent' });
  }
});

module.exports = router;
