const express = require('express');

const characterController = require('../controllers/characterController');

const swapiController = require('../controllers/swapiController');

const fileController = require('../controllers/fileController');

const router = express.Router();

// ADD GET MORE CHARACTER DATA ROUTE HANDLER HERE
router.get('/:id', swapiController.getMoreCharacterData, (req, res) => {
  console.log(req.params.id);
  res.status(200).json(res.locals.characterData);
});

// ADD POST NEW CHARACTER ROUTE HANDLER HERE
router.post(
  '/',
  [characterController.createCharacter, fileController.saveCharacter],
  (req, res) => {
    res.status(200).json(res.locals.newCharacter);
  }
);
// ADD UPDATE CHARACTER ROUTE HANDLER HERE
router.patch(
  '/:id',
  [characterController.updateCharacter, fileController.saveCharacter],
  (req, res) => {
    res.status(200).send(res.locals.updatedCharacter);
  }
);

// ADD DELETE CHARACTER ROUTE HANDLER HERE
router.delete(
  '/:id',
  [characterController.deleteCharacter, fileController.deleteCharacter],
  (req, res) => {
    res.status(200).json(res.locals.deletedCharacter);
  }
);

// EXPORT THE ROUTER
module.exports = router;
