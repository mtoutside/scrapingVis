// Require dependencies
const logger = require('morgan');
const express = require('express');

// express application init
const app = express();

const port = process.env.PORT || 3000;
app.set('port', port);

app.use(logger('dev'));

// start the server
app.listen(port, () => console.log(`App started on port ${port}.`));

// Require the needed functions
const { sendResponse } = require('./app/helpers');
const { fetchAuthorProfile } = require('./app/scotch');

// Add the Scotch author profile route
app.get('/scotch/:author', (req, res, next) => {
  const author = req.params.author;
  sendResponse(res)(fetchAuthorProfile(author));
});
