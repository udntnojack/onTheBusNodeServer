const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController')


router.get('/', gameController.test);

//router.get('/addPlayer', gameController.addPlayer);

router.get('/test', gameController.test);

router.get('/createRoom', gameController.createRoom);


module.exports = router;