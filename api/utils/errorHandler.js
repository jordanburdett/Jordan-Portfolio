class APIError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    Error.captureStackTrace(this, this.constructor);
  }
}

const handleError = (res, error) => {
  if (error instanceof APIError) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message
    });
  }

  // Log unexpected errors
  console.error('Unexpected error:', error);
  
  return res.status(500).json({
    status: 'error',
    message: 'An unexpected error occurred'
  });
};

module.exports = {
  APIError,
  handleError
};
