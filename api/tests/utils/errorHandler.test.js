const { APIError, handleError } = require('../../utils/errorHandler');

describe('ErrorHandler Utils', () => {
  let mockRes;
  const originalConsoleError = console.error;

  beforeEach(() => {
    // Mock response object
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    // Silence console errors during tests
    console.error = jest.fn();
  });

  afterEach(() => {
    // Restore console.error
    console.error = originalConsoleError;
  });

  describe('APIError', () => {
    it('should create an error with default status code of 500', () => {
      const error = new APIError('Test error');
      
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(500);
      expect(error.status).toBe('error');
    });

    it('should create an error with custom status code', () => {
      const error = new APIError('Not found', 404);
      
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Not found');
      expect(error.statusCode).toBe(404);
      expect(error.status).toBe('fail');
    });

    it('should set status as "fail" for 4xx errors', () => {
      const error = new APIError('Bad request', 400);
      
      expect(error.status).toBe('fail');
    });

    it('should set status as "error" for 5xx errors', () => {
      const error = new APIError('Server error', 500);
      
      expect(error.status).toBe('error');
    });
  });

  describe('handleError', () => {
    it('should handle APIError instances with correct status', () => {
      const apiError = new APIError('Custom error', 400);
      
      handleError(mockRes, apiError);
      
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'fail',
        message: 'Custom error'
      });
    });

    it('should handle generic errors with 500 status', () => {
      const genericError = new Error('Something went wrong');
      
      handleError(mockRes, genericError);
      
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'An unexpected error occurred'
      });
      expect(console.error).toHaveBeenCalledWith('Unexpected error:', genericError);
    });

    it('should handle errors with undefined message', () => {
      const emptyError = new Error();
      
      handleError(mockRes, emptyError);
      
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        status: 'error',
        message: 'An unexpected error occurred'
      });
    });
  });
});
