const express = require('express');
const router = express.Router();
const Record = require('../models/records.js');

//INDEX
router.get('/', (req, res) => {
  // res.send('index');
  res.render('index.ejs');
});

//NEW
router.get('/new', (req, res) => {
  // res.send('new route');
  
});

module.exports = router;
