// Require dependencies
const logger = require('morgan');
const express = require('express');
const getPosts = require('./hayashi');

// express application init
const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(logger('dev'));

// start the server
app.listen(port, () => console.log(`App started on port ${port}.`));

// Require the needed functions
// const { sendResponse } = require('./app/helpers');
// const { fetchAuthorProfile } = require('./app/scotch');

// Add the Scotch author profile route

let posts = [];
app.get('/', (req, res, next) => {
  posts = res;
  console.log(posts);

  // posts.forEach(post => {
  //   console.log(post);
  // });
});
