const gameManager = require('../models/serverManager');

exports.createRoom = function (req, res) {
    roomNumber = gameManager.createRoom();
    console.log(roomNumber);
    res.json({roomNumber: roomNumber});
};
//
//exports.addPlayer = function (req, res) {
//    manager.addPlayer()
//};

exports.test = function (req, res) {
    console.log("sucessfully connected to server");
};

//exports.generateStartinghands = function (req, res) {
//    manager.generateStartinghands()
//};
//
//exports.getCardValue = function (req, res) {
//    return manager.getPlayerCard(playerVal, cardVal);
//}
//
//exports.updateCard = function (req, res) {
//    return manager.getPlayerCard(playerVal, cardVal);
//}

