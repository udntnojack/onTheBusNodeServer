const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController')


router.get('/', gameController.test);

router.post('/addPlayer', gameController.addPlayer);

router.post('/getPlayers', gameController.getPlayers);

router.post('/test', gameController.test);

router.get('/createRoom', gameController.createRoom);


module.exports = router;