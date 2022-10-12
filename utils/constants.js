const MONGO_SERVER = 'mongodb://localhost:27017/aroundb';

const allowedCors =
  'https://api.samantha-horsch-around-us.students.nomoredomainssbs.ru';
const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE';

const ERROR_CODE = {
  INCORRECT_DATA: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
  UNAUTHORIZED_ERROR: 401,
  FORBIDDEN: 403,
};

const ERROR_MESSAGE = {
  USER_NOT_FOUND: 'Sorry, no user was found with this id',
  CARD_NOT_FOUND: 'Sorry, no card was found with this id',
  INCORRECT_USER_DATA: 'Incorrect user data',
  INCORRECT_AVATAR_DATA: 'Incorrect avatar data',
  INCORRECT_CARD_DATA: 'Incorrect card data',
  NOT_FOUND: 'Sorry, the requested resource was not found',
  INTERNAL_SERVER_ERROR: 'Internal server error has occurred',
  CONFLICT: 'A user with this data already registered',
  BAD_REQUEST: 'The request cannot be fulfilled due to bad syntax',
  UNAUTHORIZED: 'Authorization required',
  FORBIDDEN: 'Sorry, you cannot remove others card',
};

module.exports = {
  MONGO_SERVER,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
  ERROR_CODE,
  ERROR_MESSAGE,
};
