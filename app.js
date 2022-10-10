const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const bodyParser = require('body-parser');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const { requestLogger, errorLogger } = require('./middleware/logger');

const { apiLimiter } = require('./utils/rateLimit');
const { MONGO_SERVER } = require('./utils/constants');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(MONGO_SERVER);

app.use(helmet());
app.use(apiLimiter);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '631b12b86a9e3086d8cad6ff',
//   };
//   next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
