const infoCardService = require('../../services/infoCardService');
const adminService = require('../../services/adminService');
const { validateInfoCardId } = require('../../validation/infoCardValidation');

// Mock dependencies
jest.mock('../../db/connection', () => {
  const mockCollection = {
    find: jest.fn().mockReturnThis(),
    toArray: jest.fn().mockResolvedValue([{ id: '1', Title: 'Test Card' }]),
    insertOne: jest.fn().mockResolvedValue({ acknowledged: true }),
    updateOne: jest.fn().mockResolvedValue({ acknowledged: true, modifiedCount: 1 }),
    deleteOne: jest.fn().mockResolvedValue({ acknowledged: true, deletedCount: 1 })
  };
  
  return {
    collection: jest.fn().mockReturnValue(mockCollection)
  };
});

jest.mock('../../validation/infoCardValidation', () => ({
  validateInfoCardId: jest.fn()
}));

jest.mock('../../services/adminService', () => ({
  handleDatabaseResult: jest.fn()
}));

describe('InfoCardService', () => {
  const db = require('../../db/connection');
  const mockCollection = db.collection();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllInfoCards', () => {
    it('should return all info cards', async () => {
      const result = await infoCardService.getAllInfoCards();
      
      expect(db.collection).toHaveBeenCalledWith('infoCards');
      expect(mockCollection.find).toHaveBeenCalledWith({});
      expect(mockCollection.toArray).toHaveBeenCalled();
      expect(result).toEqual([{ id: '1', Title: 'Test Card' }]);
    });

    it('should accept and apply query parameters', async () => {
      const query = { Title: 'Specific Card' };
      await infoCardService.getAllInfoCards(query);
      
      expect(mockCollection.find).toHaveBeenCalledWith(query);
    });

    it('should handle database errors', async () => {
      mockCollection.toArray.mockRejectedValueOnce(new Error('Database error'));
      
      await expect(infoCardService.getAllInfoCards()).rejects.toThrow('Database error');
    });
  });

  describe('getPublicInfoCards', () => {
    it('should return only non-hidden info cards', async () => {
      await infoCardService.getPublicInfoCards();
      
      expect(db.collection).toHaveBeenCalledWith('infoCards');
      expect(mockCollection.find).toHaveBeenCalledWith({ Hidden: false });
      expect(mockCollection.toArray).toHaveBeenCalled();
    });
  });

  describe('addInfoCard', () => {
    it('should add a new info card', async () => {
      const newCard = { Title: 'New Card', Description: 'New Description' };
      await infoCardService.addInfoCard(newCard);
      
      expect(db.collection).toHaveBeenCalledWith('infoCards');
      expect(mockCollection.insertOne).toHaveBeenCalledWith(newCard);
    });

    it('should handle database errors', async () => {
      mockCollection.insertOne.mockRejectedValueOnce(new Error('Insert error'));
      const newCard = { Title: 'New Card' };
      
      await expect(infoCardService.addInfoCard(newCard)).rejects.toThrow('Insert error');
    });
  });

  describe('updateInfoCard', () => {
    it('should update an existing info card', async () => {
      const updatedCard = { _id: 'mongo123', id: '1', Title: 'Updated Card' };
      await infoCardService.updateInfoCard(updatedCard);
      
      expect(db.collection).toHaveBeenCalledWith('infoCards');
      expect(mockCollection.updateOne).toHaveBeenCalledWith(
        { id: '1' }, 
        { $set: { id: '1', Title: 'Updated Card' } }
      );
    });

    it('should handle database errors', async () => {
      mockCollection.updateOne.mockRejectedValueOnce(new Error('Update error'));
      const updatedCard = { _id: 'mongo123', id: '1', Title: 'Updated Card' };
      
      await expect(infoCardService.updateInfoCard(updatedCard)).rejects.toThrow('Update error');
    });
  });

  describe('deleteInfoCard', () => {
    it('should delete an info card when validation passes', async () => {
      validateInfoCardId.mockReturnValueOnce({ isValid: true });
      adminService.handleDatabaseResult.mockReturnValueOnce({ success: true, message: 'infoCard deleted' });
      
      const result = await infoCardService.deleteInfoCard('1');
      
      expect(validateInfoCardId).toHaveBeenCalledWith('1');
      expect(db.collection).toHaveBeenCalledWith('infoCards');
      expect(mockCollection.deleteOne).toHaveBeenCalledWith({ id: '1' });
      expect(adminService.handleDatabaseResult).toHaveBeenCalled();
      expect(result).toEqual({ success: true, message: 'infoCard deleted' });
    });

    it('should return validation error when id is invalid', async () => {
      validateInfoCardId.mockReturnValueOnce({ isValid: false, message: 'Invalid ID' });
      
      const result = await infoCardService.deleteInfoCard(null);
      
      expect(validateInfoCardId).toHaveBeenCalledWith(null);
      expect(mockCollection.deleteOne).not.toHaveBeenCalled();
      expect(result).toEqual({ success: false, message: 'Invalid ID' });
    });

    it('should handle database errors', async () => {
      validateInfoCardId.mockReturnValueOnce({ isValid: true });
      mockCollection.deleteOne.mockRejectedValueOnce(new Error('Delete error'));
      
      await expect(infoCardService.deleteInfoCard('1')).rejects.toThrow('Delete error');
    });
  });
});
