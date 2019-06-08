const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/users.js')

router.get('/new', (req, res) => {
  res.render('sessions/new.ejs');
});

router.post('/', (req, res) => {
  User.findOne(
    {username: req.body.username},
    (err, foundUser) => {
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect('/records');
        // res.send('signed in');
      } else {
        res.send('password incorrect');
      }
    })
});

router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.render('sessions/new.ejs');
  })
});

module.exports = router;
