const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  title: {type:String, required:true},
  artist: {type:String, required:true},
  year: Number,
  format: String,
  description: String
});

const Record = mongoose.model('Record', recordSchema)

module.exports = Record
