const { apiRequest } = require('../testHelper');

describe('Index Route', () => {
  it('should return a welcome message', async () => {
    const response = await apiRequest.get('/api');
    
    expect(response.status).toBe(200);
    expect(response.text).toContain('API is working');
  });
});
