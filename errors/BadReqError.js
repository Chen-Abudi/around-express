// class BadReqError extends Error {
//   constructor(message = 'The request cannot be fulfilled due to bad syntax') {
//     super(message);
//     this.statusCode = 400;
//   }
// }

class BadReqError extends Error {
  constructor(message, ...args) {
    super(args);
    this.status = 400;
    this.message = message;
  }
}

module.exports = BadReqError;
