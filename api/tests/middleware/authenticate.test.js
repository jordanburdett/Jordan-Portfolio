const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../../middleware/authenticate');

// Mock jwt module
jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}));

describe('Authentication Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create mock request, response and next function
    req = {
      headers: {}
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    next = jest.fn();
  });

  it('should return 401 if no token is provided', () => {
    // Call the middleware
    authenticateToken(req, res, next);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ 
      success: false, 
      message: 'Unauthorized: No token provided' 
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', () => {
    // Setup mock request with invalid token
    req.headers['authorization'] = 'Bearer invalid-token';
    
    // Setup jwt.verify to return an error
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(new Error('Invalid token'), null);
    });

    // Call the middleware
    authenticateToken(req, res, next);

    // Assertions
    expect(jwt.verify).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ 
      success: false, 
      message: 'Forbidden: Invalid token' 
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() if token is valid', () => {
    // Setup mock request with valid token
    req.headers['authorization'] = 'Bearer valid-token';
    
    // Setup jwt.verify to validate the token
    const mockUser = { email: 'test@example.com', admin: true };
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(null, mockUser);
    });

    // Call the middleware
    authenticateToken(req, res, next);

    // Assertions
    expect(jwt.verify).toHaveBeenCalled();
    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
