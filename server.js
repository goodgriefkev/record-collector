require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;
const usersController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');
const recordsController = require('./controllers/records.js');

mongoose.connect('mongodb://localhost:27017/recordsdb', {
  useNewUrlParser: true
});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use('/sessions', sessionsController);
app.use('/records', recordsController);

app.listen(port, () => {
  console.log('listening on port', port);
});
