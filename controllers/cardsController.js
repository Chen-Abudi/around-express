const Card = require('../models/card');
const { createError } = require('../helpers/errors');
const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');

// GET
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

// POST
const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((error) =>
      createError(
        error,
        ERROR_MESSAGE.INCORRECT_CARD_DATA,
        ERROR_CODE.INCORRECT_DATA
      )
    )
    .catch(next);
};

// DELETE
const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(() =>
      createError(
        {
          message: ERROR_MESSAGE.INCORRECT_CARD_DATA,
        },
        ERROR_MESSAGE.CARD_NOT_FOUND,
        ERROR_CODE.NOT_FOUND
      )
    )
    .then((card) => res.send({ data: card }))
    .catch((err) =>
      createError(err, ERROR_MESSAGE.CARD_NOT_FOUND, ERROR_CODE.NOT_FOUND)
    )
    .catch(next);
};

// PUT
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((error) =>
      createError(error, ERROR_MESSAGE.CARD_NOT_FOUND, ERROR_CODE.NOT_FOUND)
    )
    .catch(next);
};

// DELETE
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((error) =>
      createError(error, ERROR_MESSAGE.CARD_NOT_FOUND, ERROR_CODE.NOT_FOUND)
    )
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
