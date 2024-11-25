import { Hand } from "./Hand";

export const suits: Suit[] = ['♥', '♦', '♠', '♣'];
export const values: Value[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export type Suit = '♥' | '♦' | '♠' | '♣';
export type Value = 'A' | '2' | '3'  | '4' | '5' | '6' | '7'
            | '8' | '9' | '10' | 'J' | 'Q' | 'K'
export type Card = {suit: Suit, rank: Value}


const generateDeck = (): Set<Card> => {
    const deck = new Set<Card>();
    for (const suit of suits) {
        for (const rank of values) {
            deck.add({ suit, rank });
        }
    }
    return deck;
};

const randomHand = (): Hand => {
    const deck = generateDeck();
    const removeRandomFromSet = (set: Set<Card>): Card => {
        const items = Array.from(set);
        const randomIndex = Math.floor(Math.random() * items.length);
        const value = items[randomIndex];
        set.delete(value);
        return value; 
    };
    
    const cards = [];
    for (let i = 0; i < 7; i++) {
        cards.push(removeRandomFromSet(deck));
    }

    return new Hand(cards);
};

const generateHandsAndTrack = (): Record<string, number> => {
    const handCounts: Record<string, number> = {
        'Royal Flush': 0,
        'Straight Flush': 0,
        'Four of a Kind': 0,
        'Full House': 0,
        'Flush': 0,
        'Straight': 0,
        'Three of a Kind': 0,
        'Two Pair': 0,
        'One Pair': 0,
        'High Card': 0,
    };

    // Generate 100 random hands
    for (let i = 0; i < 100; i++) {
        const hand: Hand = randomHand();
        const handType = hand.getHandType(); 
        handCounts[handType]++;
    }

    return handCounts;
};

// Generate a random hand
// const hand: Hand = randomHand();


// Create a specific hand
//const cards: Card[] = [{ rank: '5', suit: '♦' }, { rank: '5', suit: '♣' }, { rank: 'A', suit: '♦' }, { rank: '6', suit: '♦' }, { rank: '4', suit: '♠' }, { rank: '6', suit: '♣' }, { rank: 'A', suit: '♥' }];
//const hand: Hand = new Hand(cards)


// Output the hand and type
// console.log(hand.toString());
// console.log(hand.getHandType())


// Generate 100 hands and log the number of occurances.
console.log(`Result from 100 random hands: `);
console.log(generateHandsAndTrack());