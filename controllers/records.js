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

//SHOW
router.get('/:id', (req, res) => {
  Record.findById(req.params.id, (err, foundRecord) => {
    // res.send(foundRecord);
    res.render('show.ejs', {
      record: foundRecord
    })
  })
});

//EDIT
router.get('/:id/edit', (req, res) => {
  Record.findById(req.params.id, (err, foundRecord) => {
    // res.send('this is the edit page');
    res.render('edit.ejs', {
      record: foundRecord
    })
  })
});

//UPDATE
router.put('/:id', (req, res) => {
  Record.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedRecord) => {
    res.render('show.ejs', {
      record: updatedRecord
    })
  })
});

//DESTROY
router.delete('/:id', (req, res) => {
  Record.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/records');
  })
});

module.exports = router;
