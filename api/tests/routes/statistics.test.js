const { apiRequest, mockData } = require('../testHelper');
const StatsService = require('../../services/statsService');

// Mock the validation schema
jest.mock('../../validation/statsSchema', () => ({
  statsQuerySchema: {
    validate: jest.fn().mockReturnValue({ value: {} })
  }
}));

// Mock the error handler
jest.mock('../../utils/errorHandler', () => ({
  handleError: jest.fn((res, error) => {
    return res.status(error.statusCode || 500).json({
      status: error.status || 'error',
      message: error.message || 'An unexpected error occurred'
    });
  }),
  APIError: class APIError extends Error {
    constructor(message, statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
      this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    }
  }
}));

describe('Statistics Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/statistics', () => {
    it('should return aggregated statistics', async () => {
      // Mock the database response for this specific test
      const mockAggregateResult = {
        totalVisits: 100,
        uniqueVisitors: 50,
        averageTimeSpent: 120,
        visitsByCountry: { 'United States': 50, 'Canada': 30, 'UK': 20 },
        visitsByDevice: { 'Desktop': 60, 'Mobile': 30, 'Tablet': 10 },
        visitsByRoute: { '/': 40, '/about': 30, '/projects': 30 },
        dailyVisits: [
          { date: '2023-01-01', visits: 10 },
          { date: '2023-01-02', visits: 15 }
        ]
      };
      
      // Setup the aggregate mock for this specific test
      jest.spyOn(require('../../db/connection'), 'collection').mockImplementationOnce(() => ({
        aggregate: jest.fn().mockReturnThis(),
        next: jest.fn().mockResolvedValue(mockAggregateResult)
      }));
      
      const response = await apiRequest.get('/api/statistics');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('totalVisits');
      expect(response.body).toHaveProperty('uniqueVisitors');
      expect(response.body).toHaveProperty('averageTimeSpent');
      expect(response.body).toHaveProperty('visitsByCountry');
      expect(response.body).toHaveProperty('visitsByDevice');
      expect(response.body).toHaveProperty('visitsByRoute');
      expect(response.body).toHaveProperty('dailyVisits');
    });

    it('should handle validation errors', async () => {
      // Mock validation error just for this test
      require('../../validation/statsSchema').statsQuerySchema.validate.mockReturnValueOnce({
        error: { details: [{ message: 'Invalid query parameters' }] }
      });

      const response = await apiRequest.get('/api/statistics?invalidParam=value');
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Invalid query parameters');
    });
  });

  describe('GET /api/statistics/location', () => {
    it('should return location data for non-localhost IPs', async () => {
      const response = await apiRequest.get('/api/statistics/location');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('country');
      expect(response.body).toHaveProperty('city');
      expect(response.body).toHaveProperty('timezone');
    });
  });

  describe('POST /api/statistics/visit', () => {
    it('should record a new page visit', async () => {
      // Setup collection mock just for this test
      const mockInsertOne = jest.fn().mockResolvedValue({ acknowledged: true });
      jest.spyOn(require('../../db/connection'), 'collection').mockImplementationOnce(() => ({
        insertOne: mockInsertOne
      }));
      
      const visitData = {
        sessionId: 'test-session',
        route: '/',
        referrer: 'https://google.com',
        deviceInfo: {
          deviceType: 'Desktop',
          browser: 'Chrome'
        },
        locationInfo: {
          country: 'United States',
          city: 'San Francisco'
        }
      };
      
      const response = await apiRequest.post('/api/statistics/visit', visitData);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true });
      
      // Check that insertOne was called with a payload containing the original data
      expect(mockInsertOne).toHaveBeenCalled();
      const callArg = mockInsertOne.mock.calls[0][0];
      expect(callArg).toMatchObject(visitData);
      expect(callArg).toHaveProperty('timestamp');
    });

    it('should handle errors when recording a visit', async () => {
      // Setup collection mock to throw an error
      jest.spyOn(require('../../db/connection'), 'collection').mockImplementationOnce(() => ({
        insertOne: jest.fn().mockRejectedValue(new Error('Database error'))
      }));
      
      const response = await apiRequest.post('/api/statistics/visit', { sessionId: 'test' });
      
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to record visit' });
    });
  });

  describe('POST /api/statistics/time', () => {
    it('should update time spent on a page', async () => {
      // Setup collection mock just for this test
      const mockUpdateOne = jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 1 });
      jest.spyOn(require('../../db/connection'), 'collection').mockImplementationOnce(() => ({
        updateOne: mockUpdateOne
      }));
      
      const timeData = {
        sessionId: 'test-session',
        route: '/',
        timeSpent: 120
      };
      
      const response = await apiRequest.post('/api/statistics/time', timeData);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true });
      
      // Check that updateOne was called with the correct filter and update
      expect(mockUpdateOne).toHaveBeenCalledWith(
        { sessionId: 'test-session', route: '/' },
        { $set: { timeSpent: 120 } }
      );
    });

    it('should handle errors when updating time spent', async () => {
      // Setup collection mock to throw an error
      jest.spyOn(require('../../db/connection'), 'collection').mockImplementationOnce(() => ({
        updateOne: jest.fn().mockRejectedValue(new Error('Database error'))
      }));
      
      const response = await apiRequest.post('/api/statistics/time', { 
        sessionId: 'test-session', 
        route: '/', 
        timeSpent: 120 
      });
      
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Failed to update time spent' });
    });
  });
});
