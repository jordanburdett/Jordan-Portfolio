const request = require('supertest');
const app = require('../index');

// Helper function to make API requests for testing
const apiRequest = {
  get: (url, token = null) => {
    const req = request(app).get(url);
    if (token) {
      req.set('Authorization', `Bearer ${token.trim()}`);
    }
    return req;
  },
  post: (url, data, token = null) => {
    const req = request(app).post(url).send(data);
    if (token) {
      req.set('Authorization', `Bearer ${token.trim()}`);
    }
    return req;
  },
  put: (url, data, token = null) => {
    const req = request(app).put(url).send(data);
    if (token) {
      req.set('Authorization', `Bearer ${token.trim()}`);
    }
    return req;
  },
  delete: (url, data, token = null) => {
    const req = request(app).delete(url).send(data);
    if (token) {
      req.set('Authorization', `Bearer ${token.trim()}`);
    }
    return req;
  }
};

// Mock data for testing
const mockData = {
  infoCard: {
    id: 'test-info-card-id',
    title: 'Test Info Card',
    description: 'This is a test info card',
    imageUrl: 'https://example.com/image.jpg',
    Hidden: false
  },
  project: {
    id: 'test-project-id',
    title: 'Test Project',
    description: 'This is a test project',
    imageUrl: 'https://example.com/project.jpg',
    github: 'https://github.com/test/project',
    liveDemo: 'https://example.com/demo',
    technologies: ['Node.js', 'Express', 'MongoDB']
  },
  about: {
    id: 'test-about-id',
    content: 'This is test about content',
    hidden: false
  },
  statistics: {
    id: 'test-stats-id',
    name: 'Test Stat',
    value: 42,
    icon: 'test-icon'
  },
  user: {
    username: 'testuser',
    password: 'password123',
    role: 'admin'
  }
};

module.exports = {
  apiRequest,
  mockData
};
