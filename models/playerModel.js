class player{
    constructor(name, ws){
        this.status = true;
        this.name = name;
        this.ws = ws;
        this.hand = [];
    }
    getws(){
        return this.ws;
    }
    updateStatus(status){
        this.status = status;
    }
    addCard(card){
        this.hand.push(card);
    }
    getCard(num){
        return this.hand[num];
    }
    updateCard(num){
        this.hand[num].flip();
    }
}
module.exports = player;