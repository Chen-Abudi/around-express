const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const router = require('./routes');

const { MONGO_SERVER } = require('./utils/constants');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect(MONGO_SERVER);

app.use(helmet());
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
