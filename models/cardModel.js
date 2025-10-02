class Card {

    constructor(value, suit, suitValue, points, displayValue){
        this.value = value;
        this.suit = suit;
        this.suitValue = suitValue;
        this.points = points;
        this.displayValue = displayValue;
        this.flipped = false;
    }
    flip()
    {
        this.flipped = true;
    }

    getValue()
    {
        return this.value;
    }
    getSuit()
    {
        return this.suit;
    }
    getSuitValue()
    {
        return this.suitValue;
    }
    getDrinkValue()
    {
        return this.drinkValue;
    }
    getDisplayValue()
    {
        return this.displayValue;
    }
}
module.exports = Card;