const { apiRequest, mockData } = require('../testHelper');
const infoCardService = require('../../services/infoCardService');
const adminService = require('../../services/adminService');
const { validateInfoCard } = require('../../validation/infoCardValidation');

// Mock the infoCardService methods
jest.mock('../../services/infoCardService');

// Mock the validation module
jest.mock('../../validation/infoCardValidation', () => ({
  validateInfoCard: jest.fn().mockReturnValue({ isValid: true }),
  validateInfoCardId: jest.fn().mockReturnValue({ isValid: true })
}));

describe('InfoCard Routes', () => {
  let mockToken;

  beforeEach(() => {
    mockToken = global.generateMockToken();
    
    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Setup default mock implementations
    infoCardService.getAllInfoCards.mockResolvedValue([mockData.infoCard]);
    infoCardService.getPublicInfoCards.mockResolvedValue([mockData.infoCard]);
    infoCardService.addInfoCard.mockResolvedValue({ acknowledged: true });
    infoCardService.updateInfoCard.mockResolvedValue({ acknowledged: true, modifiedCount: 1 });
    infoCardService.deleteInfoCard.mockResolvedValue({ success: true, message: 'infoCard deleted' });
    
    // Reset validateInfoCard to return valid by default
    validateInfoCard.mockReturnValue({ isValid: true });
  });

  describe('GET /api/infocard', () => {
    it('should return all info cards when authorized as admin', async () => {
      const response = await apiRequest.get('/api/infocard', mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockData.infoCard]);
      expect(infoCardService.getAllInfoCards).toHaveBeenCalled();
    });

    it('should return 403 when not authorized as admin', async () => {
      adminService.isAdminUser.mockReturnValueOnce(false);
      
      const response = await apiRequest.get('/api/infocard', mockToken);
      
      expect(response.status).toBe(403);
      expect(infoCardService.getAllInfoCards).not.toHaveBeenCalled();
    });
  });

  describe('POST /api/infocard', () => {
    it('should add a new info card when valid data is provided', async () => {
      const response = await apiRequest.post('/api/infocard', { infoCard: mockData.infoCard }, mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true, message: 'infoCard added' });
      expect(infoCardService.addInfoCard).toHaveBeenCalledWith(mockData.infoCard);
    });

    it('should return validation error when invalid data is provided', async () => {
      // Mock validation failure
      validateInfoCard.mockReturnValueOnce({ isValid: false, message: 'validation error' });
      
      const invalidInfoCard = { ...mockData.infoCard, id: null };
      const response = await apiRequest.post('/api/infocard', { infoCard: invalidInfoCard }, mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: false, message: 'validation error' });
      expect(infoCardService.addInfoCard).not.toHaveBeenCalled();
    });

    it('should return 403 when not authorized as admin', async () => {
      adminService.isAdminUser.mockReturnValueOnce(false);
      
      const response = await apiRequest.post('/api/infocard', { infoCard: mockData.infoCard }, mockToken);
      
      expect(response.status).toBe(403);
      expect(infoCardService.addInfoCard).not.toHaveBeenCalled();
    });
  });

  describe('PUT /api/infocard/updateinfocard', () => {
    it('should update an info card when valid data is provided', async () => {
      const response = await apiRequest.put('/api/infocard/updateinfocard', { infoCard: mockData.infoCard }, mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true, message: 'infoCard updated' });
      expect(infoCardService.updateInfoCard).toHaveBeenCalledWith(mockData.infoCard);
    });

    it('should return error when update fails', async () => {
      infoCardService.updateInfoCard.mockResolvedValueOnce({ acknowledged: true, modifiedCount: 0 });
      
      const response = await apiRequest.put('/api/infocard/updateinfocard', { infoCard: mockData.infoCard }, mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: false, message: 'infoCard not found' });
    });

    it('should return error when update is not acknowledged', async () => {
      infoCardService.updateInfoCard.mockResolvedValueOnce({ acknowledged: false });
      
      const response = await apiRequest.put('/api/infocard/updateinfocard', { infoCard: mockData.infoCard }, mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: false, message: 'infoCard not updated' });
    });

    it('should return 403 when not authorized as admin', async () => {
      adminService.isAdminUser.mockReturnValueOnce(false);
      
      const response = await apiRequest.put('/api/infocard/updateinfocard', { infoCard: mockData.infoCard }, mockToken);
      
      expect(response.status).toBe(403);
      expect(infoCardService.updateInfoCard).not.toHaveBeenCalled();
    });
  });

  describe('DELETE /api/infocard/deleteinfocard', () => {
    it('should delete an info card when valid ID is provided', async () => {
      const response = await apiRequest.delete('/api/infocard/deleteinfocard', { id: mockData.infoCard.id }, mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: true, message: 'infoCard deleted' });
      expect(infoCardService.deleteInfoCard).toHaveBeenCalledWith(mockData.infoCard.id);
    });

    it('should return error when delete fails', async () => {
      infoCardService.deleteInfoCard.mockResolvedValueOnce({ success: false, message: 'infoCard not found' });
      
      const response = await apiRequest.delete('/api/infocard/deleteinfocard', { id: 'invalid-id' }, mockToken);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: false, message: 'infoCard not found' });
    });

    it('should return 403 when not authorized as admin', async () => {
      adminService.isAdminUser.mockReturnValueOnce(false);
      
      const response = await apiRequest.delete('/api/infocard/deleteinfocard', { id: mockData.infoCard.id }, mockToken);
      
      expect(response.status).toBe(403);
      expect(infoCardService.deleteInfoCard).not.toHaveBeenCalled();
    });
  });

  describe('GET /api/infocard/getinfocards', () => {
    it('should return public info cards without authentication', async () => {
      const response = await apiRequest.get('/api/infocard/getinfocards');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockData.infoCard]);
      expect(infoCardService.getPublicInfoCards).toHaveBeenCalled();
    });

    it('should return error when no info cards are found', async () => {
      infoCardService.getPublicInfoCards.mockResolvedValueOnce(null);
      
      const response = await apiRequest.get('/api/infocard/getinfocards');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ success: false, message: 'infoCard not found' });
    });
  });
});
