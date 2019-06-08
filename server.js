require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const db = mongoose.connection;
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/recordsdb'
const usersController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');
const recordsController = require('./controllers/records.js');

mongoose.connect(MONGODB_URI, {useNewUrlParser:true});
db.on('error', (err) => console.log(err.message + ' is Mondog not running'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on('open', () => {});

mongoose.connect('mongodb://localhost:27017/recordsdb', {
  useNewUrlParser: true
});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(session ({
  secret: "acosbysweater",
  resave: false,
  saveUninitialized: false
}));
app.use('/users', usersController);
app.use('/sessions', sessionsController);
app.use('/records', recordsController);

app.get('/', (req, res) => {
  res.redirect('/records');
});

app.listen(port, () => {
  console.log('listening on port', port);
});
