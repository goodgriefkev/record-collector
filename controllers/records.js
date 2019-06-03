const express = require('express');
const router = express.Router();
const Record = require('../models/records.js');

//INDEX
router.get('/', (req, res) => {
  // res.send('index');
  Record.find({}, (err, allRecords) => {
    if(err) {
      res.send('Error displaying records')
    } else {
      res.render('index.ejs', {
        records: allRecords
      });
    }
  })
});

//NEW
router.get('/new', (req, res) => {
  // res.send('new route');
  res.render('new.ejs');
});

//CREATE
router.post('/', (req, res) => {
  Record.create(req.body, (err, createdRecord) => {
    if (err) {
      res.send('Record not created');
    } else {
      console.log(createdRecord);
      // res.send(createdRecord);
      res.redirect('/records');
    }
  })
});

module.exports = router;
