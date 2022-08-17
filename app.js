const express = require('express');
const helmet = require('helmet');
const router = require('./routes');

const app = express();
const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
