require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT;
const recordsController = require('./controllers/records.js');

mongoose.connect('mongodb://localhost:27017/recordsdb', {
  useNewUrlParser: true
});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.use(express.urlencoded({extended:false}));
app.use('/records', recordsController);

app.listen(port, () => {
  console.log('listening on port', port);
});
