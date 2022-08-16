const express = require('express');
const { getCards } = require('../controllers/cardsController');

const cardsRouter = express.Router();

cardsRouter.get('/', getCards);

module.exports = cardsRouter;
