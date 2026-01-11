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
        console.log("game created with room code: " + roomCode);
        this.games.set(roomCode, newGame);
        return roomCode;
    }
    updatePlayerStatus(roomCode, name, status){
        const game = this.games.get(roomCode);
        if (game) {
            game.updatePlayerStatus(name, status);
        } else {
            console.log(`Room ${roomCode} not found`);
        }
    }
    startGame(roomCode){
        const game = this.games.get(roomCode);
        if (game) {
            game.init();


        } else {
            console.log(`Room ${roomCode} not found`);
        }
    }
    getDeck(roomCode){
        const game = this.games.get(roomCode);
        if (game) {
            return game.getDeck();
            
        } else {
            console.log(`Room ${roomCode} not found`);
        }
    }


    addPlayer(ws, roomCode, name){
        console.log(`finding Room ${roomCode}.`);
        const game = this.games.get(roomCode);
        if (game) {
            game.addPlayer(ws, name);
        } else {
            console.log(`Room ${roomCode} not found`);
        }
    }

    getPlayers(roomCode) {
        const game = this.games.get(roomCode);
        if(game){
            const players = game.getPlayers();
            return players;
        }
        else{
            console.log("invalid game");
        }
    }
    getGame(roomCode) {
        return this.games.get(roomCode);
    }
}
const gameManager = new Manager();
gameManager.init();
module.exports = gameManager;