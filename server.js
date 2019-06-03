require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;
const recordsController = require('./controllers/records.js');

app.use('/records', recordsController);

app.listen(port, () => {
  console.log('listening on port', port);
});
