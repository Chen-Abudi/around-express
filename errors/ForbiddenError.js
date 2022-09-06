class ForbiddenError extends Error {
  constructor(message = 'Sorry, you cannot remove others card') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
