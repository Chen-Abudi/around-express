const notFoundRouter = require('express').Router();

notFoundRouter.all('/', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

module.exports = notFoundRouter;
