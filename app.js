const express = require('express');
const Parser = require('rss-parser');
const dotenv = require('dotenv');
const Feed = require('./models/Feed.model.js');
const mongoose = require('mongoose');

dotenv.config();
const app = express();
const parser = new Parser();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(morgan('dev'));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err.message));

app.get('/:keyword', async (req, res) => {
  const keyword = req.params.keyword;
  const feed = await Feed.find({ keyword: keyword });
  if (feed.length) res.json(feed);
  else {
    const feeds = await parser.parseURL(
      'https://news.google.com/rss/search?q=' + keyword
    );

    feeds.items.forEach(async (element) => {
      const newFeed = new Feed({
        guid: element.guid,
        title: element.title,
        link: element.link,
        pubDate: element.pubDate,
        content: element.content,
        contentSnippet: element.contentSnippet,
        isoDate: element.isoDate,
        keyword: keyword,
      });
      const savedFeed = await newFeed.save();
    });

    res.json(feeds.items);
  }
});

app.get('/', (req, res) => {
  res.send('<h1>Welcome to our RSS feed App<h1>');
});

app.listen(process.env.PORT || 7000, () => {
  console.log('App is running at ' + process.env.PORT || 7000);
});
