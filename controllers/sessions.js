const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
  res.render('sessions/new.ejs');
});

module.exports = router;
