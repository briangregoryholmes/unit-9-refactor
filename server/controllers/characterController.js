const { convertToPhotoUrl } = require('../utils/helpers');

const characterController = {};

// ADD MIDDLEWARE TO CREATE CHARACTER HERE
characterController.createCharacter = (req, res, next) => {
  console.log('Creating');
  console.log(req.body);
  const properties = [
    'name',
    'height',
    'birth_year',
    'hair_color',
    'skin_color',
    'eye_color',
  ];
  const hasAll = properties.every((property) => req.body[property]);
  if (!hasAll) {
    return next({
      log: 'characterController.createCharacter',
      message: {
        err: 'characterController.createCharacter: ERROR: Incorrect data received',
      },
    });
  }
  res.locals.newCharacter = req.body;
  console.log('Local', res.locals);
  return next();
};

// ADD MIDDLEWARE TO UPDATE CHARACTER NICKNAME HERE
characterController.updateCharacter = (req, res, next) => {
  console.log('Updating');
  const characterId = req.params.id;
  console.log(req.body);
  const properties = ['nickname', 'fav_food'];
  const hasAll = properties.every((property) => req.body[property]);
  if (!hasAll) {
    next({
      log: 'characterController.updateCharacter',
      message: {
        err: 'characterController.updateCharacter: ERROR: Incorrect data received',
      },
    });
  }
  res.locals.updates = req.body;
  res.locals.updates.id = characterId;
  console.log('Local', res.locals);
  next();
};

// ADD MIDDLEWARE TO DELETE CHARACTER HERE
characterController.deleteCharacter = (req, res, next) => {
  console.log('deleting');
  if (!req.params.id) {
    next({
      log: 'characterController.deleteCharacter',
      message: {
        err: 'characterController.deleteCharacter: ERROR: Incorrect data received',
      },
    });
  }
  res.locals.deleteId = req.params.id;
  next();
};

// ADD MIDDLEWARE TO ADD CHARACTER PHOTOS HERE
characterController.populateCharacterPhotos = (req, res, next) => {
  console.log('Populating character photos');
  if (!res.locals.moreCharacters) {
    next({
      log: 'characterController.populateCharacterPhotos',
      message: {
        err: 'characterController.populateCharacterPhotos: ERROR: Incorrect data received',
      },
    });
  }
  res.locals.moreCharacters = res.locals.moreCharacters.map((character) => {
    character.photo = convertToPhotoUrl(character.name);
    return character;
  });
  next();
};

// EXPORT THE CONTROLLER
module.exports = characterController;
