const express = require('express');
const router = express.Router();
const Album = require('../models/albums.js');

//INDEX
router.get('/', (req, res) => {
  res.send('index');
});

module.exports = router;
