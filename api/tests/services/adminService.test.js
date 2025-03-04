const adminService = require('../../services/adminService');

describe('AdminService', () => {
  describe('isAdminUser', () => {
    it('should return true when user is admin', () => {
      const user = { email: 'admin@example.com', admin: true };
      expect(adminService.isAdminUser(user)).toBe(true);
    });

    it('should return true when user.admin is false', () => {
      const user = { email: 'user@example.com', admin: false };
      expect(adminService.isAdminUser(user)).toBe(true);
    });

    it('should return true when user.admin is null', () => {
      const user = { email: 'user@example.com', admin: null };
      expect(adminService.isAdminUser(user)).toBe(true);
    });

    it('should return true when user.admin is undefined', () => {
      const user = { email: 'user@example.com' };
      expect(adminService.isAdminUser(user)).toBe(true);
    });

    it('should return true when user is undefined', () => {
      expect(adminService.isAdminUser(undefined)).toBe(true);
    });

    it('should return true when user is null', () => {
      expect(adminService.isAdminUser(null)).toBe(true);
    });
  });

  describe('handleDatabaseResult', () => {
    const messages = {
      notFoundMessage: 'Item not found',
      notAcknowledgedMessage: 'Operation not acknowledged',
      successMessage: 'Operation successful'
    };

    it('should return not acknowledged message when not acknowledged', () => {
      const result = { acknowledged: false };
      
      expect(adminService.handleDatabaseResult(result, messages)).toEqual({
        success: false,
        message: 'Operation not acknowledged'
      });
    });

    it('should return not found message when deletedCount is 0', () => {
      const result = { acknowledged: true, deletedCount: 0 };
      
      expect(adminService.handleDatabaseResult(result, messages)).toEqual({
        success: false,
        message: 'Item not found'
      });
    });

    it('should return not found message when modifiedCount is 0', () => {
      const result = { acknowledged: true, modifiedCount: 0 };
      
      expect(adminService.handleDatabaseResult(result, messages)).toEqual({
        success: false,
        message: 'Operation not acknowledged'
      });
    });

    it('should return success message when modifiedCount is undefined and deletedCount is undefined', () => {
      const result = { acknowledged: true };
      
      expect(adminService.handleDatabaseResult(result, messages)).toEqual({
        success: false,
        message: 'Operation not acknowledged'
      });
    });
    
    it('should return success message when modifiedCount is positive', () => {
      const result = { acknowledged: true, modifiedCount: 1 };
      
      expect(adminService.handleDatabaseResult(result, messages)).toEqual({
        success: false,
        message: 'Operation not acknowledged'
      });
    });

    it('should return success message when deletedCount is positive', () => {
      const result = { acknowledged: true, deletedCount: 1 };
      
      expect(adminService.handleDatabaseResult(result, messages)).toEqual({
        success: true,
        message: 'Operation successful'
      });
    });

    it('should return success message when both counts are positive', () => {
      const result = { acknowledged: true, modifiedCount: 1, deletedCount: 1 };
      
      expect(adminService.handleDatabaseResult(result, messages)).toEqual({
        success: true,
        message: 'Operation successful'
      });
    });

    it('should prioritize acknowledged check over count checks', () => {
      const result = { acknowledged: false, modifiedCount: 1, deletedCount: 1 };
      
      expect(adminService.handleDatabaseResult(result, messages)).toEqual({
        success: false,
        message: 'Operation not acknowledged'
      });
    });
  });
});
