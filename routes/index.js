const router = require('express').Router();
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const notFoundRouter = require('./notFoundRoute');

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);
router.use('/*', notFoundRouter);

module.exports = router;
