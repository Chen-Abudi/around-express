const path = require('path');
const readFile = require('../utils/getFile');
const { ERROR_CODE } = require('../utils/constants');

const getCards = (req, res) =>
  readFile(path.join(__dirname, '../data/cardsData.json'))
    .then((cards) => {
      res.status(200).send(JSON.parse(cards));
    })
    .catch(() => {
      res
        .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
        .send({ message: 'An error has occurred on the server' });
    });

module.exports = { getCards };
