require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const albumsController = require('./controllers/albums.js');

app.use('/albums', albumsController);

app.listen(port, () => {
  console.log('listening on port', port);
});
