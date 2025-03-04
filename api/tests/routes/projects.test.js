const { apiRequest, mockData } = require('../testHelper');

// Mock the database connection
jest.mock('../../db/connection', () => {
  return {
    collection: jest.fn().mockImplementation(() => ({
      find: jest.fn().mockReturnThis(),
      findOne: jest.fn(),
      insertOne: jest.fn().mockResolvedValue({ acknowledged: true }),
      updateOne: jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 1 }),
      deleteOne: jest.fn().mockResolvedValue({ acknowledged: true, deletedCount: 1 }),
      toArray: jest.fn().mockResolvedValue([mockData.project]),
    })),
  };
});

// Mock the authentication middleware
jest.mock('../../auth/auth', () => {
  return jest.fn((req, res, next) => {
    req.user = { userId: 'mockUserId', admin: true };
    next();
  });
});

describe('Projects Routes', () => {
  let mockToken;

  beforeEach(() => {
    mockToken = global.generateMockToken({ userId: 'mockUserId', admin: true });
    jest.clearAllMocks();
  });

  describe('GET /api/projects', () => {
    it('should return all projects', async () => {
      const response = await apiRequest.get('/api/projects');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockData.project]);
    });
  });

  describe('POST /api/projects', () => {
    it('should add a new project when valid data is provided', async () => {
      const response = await apiRequest.post('/api/projects', { project: mockData.project }, mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true, message: 'project added' });
    });

    it('should return error when project is not provided', async () => {
      const response = await apiRequest.post('/api/projects', {}, mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: false, message: 'project not provided' });
    });

    it('should return 403 when not authorized as admin', async () => {
      // Mock auth to return non-admin user
      require('../../auth/auth').mockImplementationOnce((req, res, next) => {
        req.user = { userId: 'mockUserId', admin: false };
        next();
      });

      const response = await apiRequest.post('/api/projects', { project: mockData.project }, mockToken);
      
      expect(response.status).toBe(403);
    });
  });

  describe('PUT /api/projects/updateproject', () => {
    it('should update a project when valid data is provided', async () => {
      const response = await apiRequest.put('/api/projects/updateproject', { project: mockData.project }, mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true, message: 'project updated' });
    });

    it('should return error when project is not provided', async () => {
      const response = await apiRequest.put('/api/projects/updateproject', { project: null }, mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: false, message: 'project not provided' });
    });

    it('should return error when project is not found', async () => {
      // Mock db to return no modified documents
      require('../../db/connection').collection.mockImplementationOnce(() => ({
        updateOne: jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 0 }),
      }));

      const response = await apiRequest.put('/api/projects/updateproject', { project: mockData.project }, mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: false, message: 'project not found' });
    });

    it('should return 403 when not authorized as admin', async () => {
      // Mock auth to return non-admin user
      require('../../auth/auth').mockImplementationOnce((req, res, next) => {
        req.user = { userId: 'mockUserId', admin: false };
        next();
      });

      const response = await apiRequest.put('/api/projects/updateproject', { project: mockData.project }, mockToken);
      
      expect(response.status).toBe(403);
    });
  });

  describe('DELETE /api/projects/deleteproject', () => {
    it('should delete a project when valid ID is provided', async () => {
      const response = await apiRequest.delete('/api/projects/deleteproject', { id: mockData.project.id }, mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true, message: 'project deleted' });
    });

    it('should return error when project ID is not provided', async () => {
      const response = await apiRequest.delete('/api/projects/deleteproject', { id: null }, mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: false, message: 'project not provided' });
    });

    it('should return 403 when not authorized as admin', async () => {
      // Mock auth to return non-admin user
      require('../../auth/auth').mockImplementationOnce((req, res, next) => {
        req.user = { userId: 'mockUserId', admin: false };
        next();
      });

      const response = await apiRequest.delete('/api/projects/deleteproject', { id: mockData.project.id }, mockToken);
      
      expect(response.status).toBe(403);
    });
  });
});
