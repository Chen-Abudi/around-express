const Card = require('../models/card');
const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');

// GET
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res
        .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
        .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
    })
    .catch(next);
};

// POST
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_CARD_DATA);
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
      }
    })
    .catch(next);
};

// DELETE
const deleteCard = (req, res, next) => {
  const { _id } = req.params;

  Card.findByIdAndRemove(_id)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_CARD_DATA);
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send(ERROR_MESSAGE.CARD_NOT_FOUND);
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
      }
    })
    .catch(next);
};

// PUT
const likeCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_CARD_DATA);
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send(ERROR_MESSAGE.CARD_NOT_FOUND);
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
      }
    })
    .catch(next);
};

// DELETE
const dislikeCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send(ERROR_MESSAGE.INCORRECT_CARD_DATA);
      }
      if (err.name === 'DocumentNotFoundError') {
        res.status(ERROR_CODE.NOT_FOUND).send(ERROR_MESSAGE.CARD_NOT_FOUND);
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send(ERROR_MESSAGE.INTERNAL_SERVER_ERROR);
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
