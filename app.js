require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

// Set Mongoose strictQuery option
mongoose.set('strictQuery', false); // Suppress the deprecation warning

// mongoose.connect(MONGO_SERVER);

mongoose
  .connect(MONGO_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

app.use(helmet());
app.use(apiLimiter);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
