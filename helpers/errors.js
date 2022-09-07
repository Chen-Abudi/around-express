const { CustomError } = require('../utils/CustomError');
const { ERROR_CODE } = require('../utils/constants');

const createError = (error, msg, statusCode) => {
  throw new CustomError(`${msg} : ${error.message}`, statusCode);
};

const errorHandler = (error, messageBadReq, messageNotFound) => {
  if (error.name === 'CastError') {
    createError(error, messageNotFound, ERROR_CODE.NOT_FOUND);
  }

  createError(error, messageBadReq, ERROR_CODE.INCORRECT_DATA);
};

module.exports = {
  createError,
  errorHandler,
};
