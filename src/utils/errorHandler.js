class ErrorHandler {
  static handleValidationError(res, error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  static handleServerError(res, error) {
    console.error('Server Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = ErrorHandler;