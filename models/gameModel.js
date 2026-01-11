const Deck = require('../models/deckModel');
const player = require( '../models/playerModel');


class Game{
    static roomNumber = 0;
    constructor(){
        Game.roomNumber++;
        this.roomNumber  = String(Game.roomNumber); 
        this.players = [];
        this.gameDeck;
    }
    init(){
        this.gameDeck = new Deck();
        this.gameDeck.init();
    }
    dealHands(){
        for(var i = 0; i <4; i++){
            players.forEach(player => {
                player.addCard(this.gameDeck.getCard());
            });
        }
    }
    getDeck(){
        return this.gameDeck;
    }
    
    getPlayers(){
        return this.players;
    }
    getRoomCode(){
        return this.roomNumber;
    }
    addPlayer(ws, name){
        var tmp = new player(name, ws);
        this.players.push(tmp);
    }
    updatePlayerStatus(name, status){
        this.players[playerVal].updatePlayerStatus(cardVal);
    }

    getPlayerCard(playerVal, cardVal){
        this.players[playerVal].getCard(cardVal);
    }
    updateCard(playerVal, cardVal){
        this.players[playerVal].updateCard(cardVal);
    }
}
module.exports = Game;