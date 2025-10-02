class player{
    constructor(name){
        this.name = name;
        this.hand = [];
    }
    addCard(card){
        this.hand.add(card);
    }
    getCard(num){
        return this.hand[num];
    }
    updateCard(num){
        this.hand[num].flip();
    }
}