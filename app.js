const express = require('express');
const helmet = require('helmet');

const app = express();
const { PORT = 3000 } = process.env;

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const notFoundRouter = require('./routes/notFoundRoute');

app.use(helmet());
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('/*', notFoundRouter);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});