const path = require('path');
const readFile = require('../utils/getFile');

const getCards = (req, res) =>
  readFile(path.join(__dirname, '../data/cardsData.json'))
    .then((cards) => {
      res.status(200).send(JSON.parse(cards));
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });

module.exports = { getCards };
