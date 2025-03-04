const StatsService = require('../../services/statsService');

describe('StatsService', () => {
  let statsService;
  let mockCollection;

  beforeEach(() => {
    // Create a mock collection with all necessary methods
    mockCollection = {
      aggregate: jest.fn().mockReturnThis(),
      next: jest.fn().mockResolvedValue(null)
    };
    
    // Initialize StatsService with the mock collection
    statsService = new StatsService(mockCollection);
  });

  describe('getAggregatedStats', () => {
    it('should call aggregate with the correct pipeline and return results', async () => {
      // Mock successful response
      const mockResponse = {
        totalVisits: 100,
        uniqueVisitors: 50,
        averageTimeSpent: 120
      };
      mockCollection.next.mockResolvedValueOnce(mockResponse);
      
      const result = await statsService.getAggregatedStats({});
      
      expect(mockCollection.aggregate).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });

    it('should return default stats when no results are found', async () => {
      // Mock null response (no results found)
      mockCollection.next.mockResolvedValueOnce(null);
      
      const result = await statsService.getAggregatedStats({});
      
      expect(result).toEqual(statsService.getDefaultStatsResponse());
    });
  });

  describe('buildPipeline', () => {
    it('should build pipeline without date filters when no dates provided', () => {
      const pipeline = statsService.buildPipeline({});
      
      // Pipeline should not have date match stage at the beginning
      expect(pipeline[0]).not.toHaveProperty('$match');
    });

    it('should include date filters when start/end dates are provided', () => {
      const startDate = '2023-01-01';
      const endDate = '2023-01-31';
      
      const pipeline = statsService.buildPipeline({ startDate, endDate });
      
      // First stage should be a match on date range
      expect(pipeline[0]).toHaveProperty('$match');
      expect(pipeline[0].$match).toHaveProperty('timestampDate');
      expect(pipeline[0].$match.timestampDate).toHaveProperty('$gte');
      expect(pipeline[0].$match.timestampDate).toHaveProperty('$lte');
    });
  });

  describe('buildDateFilter', () => {
    it('should return null when no dates are provided', () => {
      const result = statsService.buildDateFilter();
      expect(result).toBeNull();
    });

    it('should build filter with start date only', () => {
      const startDate = '2023-01-01';
      const result = statsService.buildDateFilter(startDate);
      
      expect(result).toHaveProperty('timestampDate');
      expect(result.timestampDate).toHaveProperty('$gte');
      expect(result.timestampDate).not.toHaveProperty('$lte');
    });

    it('should build filter with end date only', () => {
      const endDate = '2023-01-31';
      const result = statsService.buildDateFilter(null, endDate);
      
      expect(result).toHaveProperty('timestampDate');
      expect(result.timestampDate).not.toHaveProperty('$gte');
      expect(result.timestampDate).toHaveProperty('$lte');
    });

    it('should build filter with both start and end dates', () => {
      const startDate = '2023-01-01';
      const endDate = '2023-01-31';
      const result = statsService.buildDateFilter(startDate, endDate);
      
      expect(result).toHaveProperty('timestampDate');
      expect(result.timestampDate).toHaveProperty('$gte');
      expect(result.timestampDate).toHaveProperty('$lte');
    });
  });

  describe('buildDimensionFilters', () => {
    it('should return empty array when no filters provided', () => {
      const result = statsService.buildDimensionFilters();
      expect(result).toEqual([]);
    });

    it('should build match for country filter', () => {
      const filters = { country: 'United States' };
      const result = statsService.buildDimensionFilters(filters);
      
      expect(result).toHaveLength(1);
      expect(result[0].$match['locationInfo.country']).toBe('United States');
    });

    it('should build match for deviceType filter', () => {
      const filters = { deviceType: 'Desktop' };
      const result = statsService.buildDimensionFilters(filters);
      
      expect(result).toHaveLength(1);
      expect(result[0].$match['deviceInfo.deviceType']).toBe('Desktop');
    });

    it('should build match for route filter', () => {
      const filters = { route: '/about' };
      const result = statsService.buildDimensionFilters(filters);
      
      expect(result).toHaveLength(1);
      expect(result[0].$match.route).toBe('/about');
    });

    it('should build matches for multiple filters', () => {
      const filters = { 
        country: 'United States',
        deviceType: 'Desktop',
        route: '/about'
      };
      const result = statsService.buildDimensionFilters(filters);
      
      expect(result).toHaveLength(3);
    });
  });

  describe('overviewStats', () => {
    it('should return the proper group aggregation', () => {
      const result = statsService.overviewStats();
      
      expect(result).toHaveProperty('$group');
      expect(result.$group).toHaveProperty('_id', null);
      expect(result.$group).toHaveProperty('totalVisits');
      expect(result.$group).toHaveProperty('uniqueVisitors');
      expect(result.$group).toHaveProperty('totalTimeSpent');
    });
  });

  describe('visitsByDimension', () => {
    it('should return the proper group aggregation for a dimension', () => {
      const dimensionPath = 'locationInfo.country';
      const result = statsService.visitsByDimension(dimensionPath);
      
      expect(result).toHaveProperty('$group');
      expect(result.$group).toHaveProperty('_id', `$${dimensionPath}`);
      expect(result.$group).toHaveProperty('count');
    });
  });

  describe('dailyVisitsStats', () => {
    it('should return the proper group and sort stages', () => {
      const result = statsService.dailyVisitsStats();
      
      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('$group');
      expect(result[0].$group).toHaveProperty('_id');
      expect(result[0].$group).toHaveProperty('visits');
      expect(result[1]).toHaveProperty('$sort');
    });
  });

  describe('getDefaultStatsResponse', () => {
    it('should return the default stats structure', () => {
      const result = statsService.getDefaultStatsResponse();
      
      expect(result).toHaveProperty('totalVisits', 0);
      expect(result).toHaveProperty('uniqueVisitors', 0);
      expect(result).toHaveProperty('averageTimeSpent', 0);
      expect(result).toHaveProperty('visitsByCountry', {});
      expect(result).toHaveProperty('visitsByDevice', {});
      expect(result).toHaveProperty('visitsByRoute', {});
      expect(result).toHaveProperty('dailyVisits', []);
    });
  });
});
