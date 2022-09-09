const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
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
    _id: '631b12b86a9e3086d8cad6ff',
  };
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
