const path = require('path');
const readFile = require('../utils/getFile');

const getUsers = (req, res) =>
  readFile(path.join(__dirname, '../data/usersData.json'))
    .then((users) => {
      res.status(200).send(JSON.parse(users));
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });

const getUserById = (req, res) =>
  readFile(path.join(__dirname, '../data/usersData.json'))
    .then((users) => {
      const { id } = req.params;
      const usersDataParse = JSON.parse(users);
      const user = usersDataParse.find(({ _id: userId }) => userId === id);
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
      } else {
        res.send({ data: user });
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });

module.exports = { getUsers, getUserById };
