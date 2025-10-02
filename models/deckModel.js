const Card = require('../models/cardModel');

class Deck {
    constructor(){
        this.cards = [];
        this.numCards = 52;
        this.cardNum = 0;
    }
    
    // Start is called once before the first execution of Update after the MonoBehaviour is created

    init()
    {
        for(let i = 0; i < this.numCards; i++)
        {
            const value = this.getValue(i);
            const suit = this.getSuit(i);
            const suitValue = this.getSuitValue(suit);
            const points = this.getDrinkPoints(value);
            const displayValue = this.getDisplayValue(value);
            this.cards.push(new Card(value, suit, suitValue, points, displayValue));
        }
        this.cards = this.ShuffleDeck();
    }
    getSuitValue(suit)
    {
        if(this.suit == "clubs")
        {
            return 0;
        }
        else if(this.suit == "diamonds")
        {
            return 1;
        }
        else if (this.suit == "hearts")
        {
            return 2;
        }
        else
        {
            return 3;
        }
    }

    getCard()
    {
        return this.cards.Pop();
    }

    getDisplayValue(i)
    {
        if (i == 1)
        {
            return "A";
        }
        else if (i < 11)
        {
            return i;
        }
        else if (i == 11)
        {
            return "J";
        }
        else if (i == 12)
        {
            return "Q";
        }
        else
        {
            return "K";
        }
    }
    getDrinkPoints(i)
    {
        if (i == 1)
        {
            return 4;
        }
        else if (i < 11)
        {
            return 0;
        }
        else
        {
            return i % 10;
        }
    }
    getValue(i)
    {
        var value = i % 13;
        if (value > 0)
        {
            return value;
        }
        else
        {
            return 13;
        }
    }
    getSuit(i)
    {
        if (i >= 1 && i <= 13)
        {
            return "hearts";
        }
        else if (i > 13 && i <= 26)
        {
            return "clubs";

        }
        else if (i > 26 && i <= 39)
        {
            return "diamonds";
        }
        else
        {
            return "spades";
        }
    }
    ShuffleDeck()
    {
        var newCards = this.cards;
        var oldcards = newCards;
        for (var i = 0; i < newCards.Count; i++)
        {
            tmp = oldcards[i];
            r = Random.Range(i, newCards.Count);
            newCards[i] = newCards[r];
            newCards[r] = tmp;
        }
        
        return newCards;
    }
}
module.exports = Deck;