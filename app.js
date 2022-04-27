const Express = require('express');
const Parser = require('rss-parser');

const app = Express();
const parser = new Parser();

app.get('/:keyword', async (req, res) => {
  const keyword = req.params.keyword;
  const feed = await parser.parseURL(
    'https://news.google.com/rss/search?q=' + keyword
  );

  res.send(feed.items);
});

app.get('/', (req, res) => {
  res.send('<h1>Welcome to our RSS feed App<h1>');
});

app.listen(7000, () => {
  console.log('App is running at port 7000');
});
