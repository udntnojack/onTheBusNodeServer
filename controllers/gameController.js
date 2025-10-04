const gameManager = require('../models/serverManager');

exports.createRoom = function (req, res) {
    roomNumber = gameManager.createRoom();
    console.log(roomNumber);
    res.json({roomNumber: roomNumber});
};

exports.addPlayer = function (req, res) {
    const playerName = req.body.name;
    const roomCode = req.body.roomCode;
    manager.addPlayer(playerName, roomCode);
};

exports.getPlayers = function (req, res) {
    const roomCode = req.body.roomCode;
    const players = manager.getPlayers(roomCode);
    var json = {};
    for(var i = 0; i < players.length; i++){
        json[i]["player" + i] =players[i];
    }
    res.json(json);
};

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

