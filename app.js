const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { ERROR_CODE, ERROR_MESSAGE } = require('./utils/constants');
const router = require('./routes');

const { apiLimiter } = require('./utils/rateLimit');
const { MONGO_SERVER } = require('./utils/constants');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(MONGO_SERVER);

app.use(helmet());
app.use(apiLimiter);

app.use((req, res, next) => {
  req.user = {
    _id: '631644f41b1235f986a00c3c',
  };
  next();
});

app.use((error, req, res, next) => {
  if (error.status !== ERROR_CODE.INTERNAL_SERVER_ERROR) {
    res.status(error.status).send({ message: error.message });
    return;
  }
  res
    .status(error.status)
    .send({ message: `${ERROR_MESSAGE.INTERNAL_SERVER_ERROR}` });
  next();
});

app.use((req, res) => {
  res.status(ERROR_CODE.NOT_FOUND).send({ message: ERROR_MESSAGE.NOT_FOUND });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
