const express = require('express');
const characterController = require('../controllers/characterController');

const fileController = require('../controllers/fileController');
const swapiController = require('../controllers/swapiController');

const router = express.Router();

// ADD STARTER DATA REQUEST ROUTE HANDLER HERE
router.get(
  '/',
  [fileController.getCharacters, fileController.getFavs],
  (req, res) => {
    console.log('API hit');
    res
      .status(200)
      .json({ characters: res.locals.characters, favs: res.locals.favs });
  }
);

// ADD GET MORE CHARACTERS ROUTE HANDLER HERE
router.get(
  '/more-characters',
  [
    fileController.checkCharacterCache,
    swapiController.getMoreCharacters,
    characterController.populateCharacterPhotos,
    fileController.writeCharacterCache,
  ],
  (req, res) => {
    res.status(200).json({ moreCharacters: res.locals.moreCharacters });
  }
);

module.exports = router;
