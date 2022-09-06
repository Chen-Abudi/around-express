const BadReqError = require('./BadReqError');
const NotFoundError = require('./NotFoundError');

const createBadReqError = (error, message) => {
  throw new BadReqError({ message: `${message} : ${error.message}` });
};

const createNotFoundError = (error, message) => {
  throw new NotFoundError({ message: `${message} : ${error.message}` });
};

const errorHandler = (error, messageBadReq, messageNotFound) => {
  if (error.name === 'CastError') {
    createNotFoundError(error, messageNotFound);
  }

  createBadReqError(error, messageBadReq);
};

module.exports = {
  createBadReqError,
  createNotFoundError,
  errorHandler,
};
