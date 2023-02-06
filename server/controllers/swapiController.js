const API_ENDPOINT = 'https://swapi.dev/api/people/';
const swapiController = {};

// MIDDLEWARE TO GET MORE CHARACTER DATA
swapiController.getMoreCharacterData = (req, res, next) => {
  console.log(req.params);
  const characterId = req.params.id;
  console.log(`${API_ENDPOINT}${characterId}`);
  fetch(`${API_ENDPOINT}${characterId}`)
    .then((response) => response.json())
    .then((data) => {
      res.locals.characterData = data;
      return next();
    })
    .catch((errorObject) => {
      const error = {
        log: `swapiController.getMoreCharacterData: ${errorObject.data}`,
        message: {
          err: 'swapiController.getMoreCharacters: ERROR: Check server logs for details',
        },
      };
      next(error);
    });
};

// ADD MIDDLEWARE TO GET MORE CHARACTERS HERE
swapiController.getMoreCharacters = (req, res, next) => {
  if (res.locals.moreCharacters) {
    console.log('Skipping fetch');
    return next();
  }
  console.log('Fetching data...');
  fetch(`${API_ENDPOINT}?page=3`)
    .then((response) => response.json())
    .then((data) => {
      res.locals.moreCharacters = data.results;
      return next();
    })
    .catch((errorObject) => {
      const error = {
        log: `swapiController.getMoreCharacters: ${errorObject.data}`,
        message: {
          err: 'swapiController.getMoreCharacters: ERROR: Check server logs for details',
        },
      };
      next(error);
    });
};

// EXPORT THE CONTROLLER HERE
module.exports = swapiController;
