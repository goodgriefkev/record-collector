const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('sessions/new.ejs');
});

router.post('/', (req, res) => {
  User.findOne(
    {username: req.body.username},
    (err, foundUser) => {
      if(req.body.password == foundUser.password) {
        req.session.currentUser = foundUser;
        res.redirect('/');
        // res.send('signed in');
      } else {
        res.send('password incorrect');
      }
    })
});

router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  })
});

module.exports = router;
