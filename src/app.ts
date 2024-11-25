import { Hand } from "./Hand";
import { Round } from "./Round";

export const suits: Suit[] = ['♥', '♦', '♠', '♣'];
export const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export type Suit = '♥' | '♦' | '♠' | '♣';
export type Rank = 'A' | '2' | '3'  | '4' | '5' | '6' | '7'
            | '8' | '9' | '10' | 'J' | 'Q' | 'K'
export type Card = {suit: Suit, rank: Rank}


const generateDeck = (): Set<Card> => {
    const deck = new Set<Card>();
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.add({ suit, rank });
        }
    }
    return deck;
};

export const removeRandomFromSet = (set: Set<Card>): Card => {
    const items = Array.from(set);
    const randomIndex = Math.floor(Math.random() * items.length);
    const value = items[randomIndex];
    set.delete(value);
    return value; 
};

export const randomHand = (): Hand => {
    const deck = generateDeck();
    const cards = [];
    for (let i = 0; i < 7; i++) {
        cards.push(removeRandomFromSet(deck));
    }

    return new Hand(cards);
};

// Generate a random hand
// const hand: Hand = randomHand();


// Create a specific hand
//const cards: Card[] = [{ rank: '5', suit: '♦' }, { rank: '5', suit: '♣' }, { rank: 'A', suit: '♦' }, { rank: '6', suit: '♦' }, { rank: '4', suit: '♠' }, { rank: '6', suit: '♣' }, { rank: 'A', suit: '♥' }];
//const hand: Hand = new Hand(cards)


// Output the hand and type
// console.log(hand.toString());
// console.log(hand.getHandType())


// Simulated Poker round. Betting functionality not yet implemented.
const round: Round = new Round([]);
const hand: Hand = new Hand([]);
const deck =  generateDeck();

// First round
hand.setCard(0, removeRandomFromSet(deck));
hand.setCard(1, removeRandomFromSet(deck));
console.log(hand.getCards());
console.log(hand.getHandType())

// Second round
round.generatePublicCards(deck);
const publicCards = round.getPublicCards();
for (var i = 0; i < publicCards.length; i++) {
    hand.setCard(i+2, publicCards[i]);
}
console.log(hand.getCards());
console.log(hand.getHandType())

// Third round
var newCard = round.addPublicCard(deck)
hand.setCard(5, newCard);
console.log(hand.getCards());
console.log(hand.getHandType())

// Final round
var newCard = round.addPublicCard(deck)
hand.setCard(6, newCard);
console.log(hand.getCards());
console.log(hand.getHandType())
