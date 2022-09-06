const Card = require('../models/card');
const {
  createBadReqError,
  createNotFoundError,
} = require('../errors/customErrors');
// const BadReqError = require('../errors/BadReqError');
// const NotFoundError = require('../errors/NotFoundError');
// const ForbiddenError = require('../errors/ForbiddenError');
const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');

// const getCards = (req, res) =>
//   readFile(path.join(__dirname, '../data/cardsData.json'))
//     .then((cards) => {
//       res.status(200).send(JSON.parse(cards));
//     })
//     .catch(() => {
//       res
//         .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
//         .send({ message: 'An error has occurred on the server' });
//     });

const getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  // Card.create({ name, link, owner: req.user._id })
  //   .then((card) => res.status(201).send({ data: card }))
  //   .catch(() => next(new BadReqError()));

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((error) =>
      createBadReqError(error, error.message.INCORRECT_CARD_DATA)
    )
    .catch(next);
};

// const deleteCard = (req, res, next) => {
//   const { cardId } = req.params;
//   Card.findByIdAndRemove(cardId)
//     .orFail(new NotFoundError('Sorry, no card was found with this id'))
//     .then((card) => {
//       if (card.owner.toString() !== req.user._id) {
//         throw new ForbiddenError('Sorry, you cannot remove others card');
//       }
//     });
// };

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((error) => error.message.CARD_NOT_FOUND)
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((error) => createNotFoundError(error, error.message.CARD_NOT_FOUND))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((error) => createNotFoundError(error, error.message.CARD_NOT_FOUND))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
