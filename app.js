const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');

const bodyParser = require('body-parser');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const { requestLogger, errorLogger } = require('./middleware/logger');

const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('./utils/constants');

const { apiLimiter } = require('./utils/rateLimit');
const { MONGO_SERVER } = require('./utils/constants');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(MONGO_SERVER);

app.use(helmet());
app.use(apiLimiter);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedCors);
  res.header(
    'Access-Content-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  next();
});

app.use(cors());
app.options('*', cors());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
