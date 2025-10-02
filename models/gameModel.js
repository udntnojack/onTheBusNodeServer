const Deck = require('../models/deckModel');

class Game{
    constructor(){
        this.roomNumber;
        this.players = [];
        this.gameDeck = new Deck();
        this.gameDeck.init();
        this.init();
    }
    init(){
        this.roomNumber = this.generateRoomCode();
        console.log("game created with room code: " + this.roomNumber);
    }
    generateRoomCode(){
        return 1;
    }
    getRoomCode(){
        return this.roomNumber;
    }
    addPlayer(name){
        this.players.add(name)
    }
    getPlayerCard(playerVal, cardVal){
        this.players[playerVal].getCard(cardVal);
    }
    updateCard(playerVal, cardVal){
        this.players[playerVal].updateCard(cardVal);
    }

    generateStartinghands(){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < players.length; j++){
                const card = gameDeck.getCard();
                this.players[j].addCard(card);
            }
        }
    }
}
module.exports = Game;