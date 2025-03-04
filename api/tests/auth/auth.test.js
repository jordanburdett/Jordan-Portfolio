const { authenticateToken } = require('../../middleware/authenticate');
const jwt = require('jsonwebtoken');

// Mock jwt
jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
    
    // Reset all mocks
    jest.clearAllMocks();
  });

  it('should return 401 if authorization header is not present', () => {
    authenticateToken(req, res, next);
    
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Unauthorized: No token provided'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', () => {
    req.headers['authorization'] = 'Bearer invalid-token';
    
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(new Error('Invalid token'), null);
    });
    
    authenticateToken(req, res, next);
    
    expect(jwt.verify).toHaveBeenCalledWith('invalid-token', process.env.ACCESS_TOKEN_SECRET, expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Forbidden: Invalid token'
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should add user to request and call next if token is valid', () => {
    req.headers['authorization'] = 'Bearer valid-token';
    const mockUser = { email: 'test@example.com', admin: true };
    
    jwt.verify.mockImplementationOnce((token, secret, callback) => {
      callback(null, mockUser);
    });
    
    authenticateToken(req, res, next);
    
    expect(jwt.verify).toHaveBeenCalledWith('valid-token', process.env.ACCESS_TOKEN_SECRET, expect.any(Function));
    expect(req.user).toEqual(mockUser);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
