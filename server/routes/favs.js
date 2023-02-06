const express = require('express');

const fileController = require('../controllers/fileController');

const router = express.Router();

// ADD STORE FAVORITE ROUTE HANDLER HERE
router.post(
  '/:id',
  [fileController.getFavs, fileController.addFavs],
  (req, res) => {
    res.status(200).json({ favs: res.locals.favs });
  }
);

// ADD REMOVE FAVORITE ROUTE HANDLER HERE
router.delete(
  '/:id',
  [fileController.getFavs, fileController.removeFavs],
  (req, res) => {
    console.log(res.locals.favs);
    res.status(200).json({ favs: res.locals.favs });
  }
);

// EXPORT THE ROUTER
module.exports = router;
