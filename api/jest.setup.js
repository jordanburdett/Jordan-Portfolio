const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

// Set the NODE_ENV to test
process.env.NODE_ENV = 'test';
process.env.ACCESS_TOKEN_SECRET = 'test-secret';

// Mock the database connection
jest.mock('./db/connection', () => {
  const mockDb = {
    collection: jest.fn().mockImplementation((collectionName) => ({
      find: jest.fn().mockReturnThis(),
      findOne: jest.fn(),
      insertOne: jest.fn().mockResolvedValue({ acknowledged: true }),
      updateOne: jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 1 }),
      deleteOne: jest.fn().mockResolvedValue({ acknowledged: true, deletedCount: 1 }),
      toArray: jest.fn().mockResolvedValue([]),
      aggregate: jest.fn().mockReturnThis(),
      next: jest.fn()
    })),
  };
  return mockDb;
});

// Mock the authentication middleware
jest.mock('./auth/auth', () => {
  return jest.fn((req, res, next) => {
    req.user = { userId: 'mockUserId', role: 'admin', admin: true };
    next();
  });
});

// Mock the admin service
jest.mock('./services/adminService', () => {
  return {
    isAdminUser: jest.fn().mockReturnValue(true),
    handleDatabaseResult: jest.fn().mockImplementation((result, messages) => {
      if (result.acknowledged && result.deletedCount > 0) {
        return { success: true, message: messages.successMessage };
      } else if (result.acknowledged && result.deletedCount === 0) {
        return { success: false, message: messages.notFoundMessage };
      } else {
        return { success: false, message: messages.notAcknowledgedMessage };
      }
    }),
  };
});

// Mock the fetch API for location data
if (!global.fetch) {
  global.fetch = jest.fn(() => 
    Promise.resolve({
      json: () => Promise.resolve({
        country_name: 'United States',
        city: 'San Francisco',
        timezone: 'America/Los_Angeles'
      })
    })
  );
}

// Utility function to create a mock JWT token
global.generateMockToken = (payload = { userId: 'mockUserId', role: 'admin', admin: true }) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'test-secret', { expiresIn: '1h' });
};

// Silence console logs during tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};
