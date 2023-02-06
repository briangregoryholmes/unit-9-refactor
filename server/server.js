const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

/**
 * require routers
 */
const apiRouter = require('./routes/api');
const charactersRouter = require('./routes/characters');
const favsRouter = require('./routes/favs');
/**
 * handle parsing request body
 */
app.use(express.json());

/**
 * handle requests for static files
 */
app.use('/assets', express.static(path.join(__dirname, '../client/assets')));

/**
 * define route handlers
 */
app.use('/api/characters/', charactersRouter);
app.use('/api/favs', favsRouter);
app.use('/api', apiRouter);

// route handler to respond with main app
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
// catch-all route handler for any requests to an unknown route
app.use('*', (req, res, next) => {
  res.sendStatus(404);
});

/**
 * configure express global error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
app.use((err, req, res, next) => {
  console.log(err);
  const defaultError = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultError, err);
  console.log(errorObj.log);
  res.status(errorObj.status).send(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
