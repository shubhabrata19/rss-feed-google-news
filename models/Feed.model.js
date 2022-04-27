const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedSchema = new Schema({
  title: String,
  name: String,
  link: String,
  pubDate: String,
  content: String,
  contentSnippet: String,
  isoDate: Date,
  keyword: String,
  guid: String,
});

const Feed = mongoose.model('feed', feedSchema);
module.exports = Feed;
