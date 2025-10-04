const Game = require('../models/gameModel');

class Manager{
    constructor(){
        this.games = new Map();
    }
    init(){
        console.log('game manager initalised');
    }
    createRoom(){
        const newGame = new Game();
        const roomCode = newGame.getRoomCode();
        this.games.set(newGame, roomCode);
        return roomCode;
    }
    addPlayer(roomCode, name){
        const game = this.games.get(roomCode);
        if (game) {
            game.addPlayer(name);
        } else {
            console.log(`Room ${roomCode} not found`);
        }
    }

    getPlayers(roomCode) {
        return this.games.get(roomCode).getplayers();
    }
    getGame(roomCode) {
        return this.games.get(roomCode);
    }
}
const gameManager = new Manager();
gameManager.init();
module.exports = gameManager;