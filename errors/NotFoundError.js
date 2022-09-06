// class NotFoundError extends Error {
//   constructor(message = 'Sorry, the requested resource was not found') {
//     super(message);
//     this.statusCode = 404;
//   }
// }

class NotFoundError extends Error {
  constructor(message, ...args) {
    super(args);
    this.status = 400;
    this.message = message;
  }
}

module.exports = NotFoundError;
