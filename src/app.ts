import { Hand } from "./Classes/Hand";
export const suits: Suit[] = ['♥', '♦', '♠', '♣'];
export const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export type Suit = '♥' | '♦' | '♠' | '♣';
export type Rank = 'A' | '2' | '3'  | '4' | '5' | '6' | '7'
            | '8' | '9' | '10' | 'J' | 'Q' | 'K'
export type Card = {suit: Suit, rank: Rank}


export const generateDeck = (): Set<Card> => {
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

const runSimulation = async (args: string[]) => {
    if (args.includes('-100')) {
        const { generateHandsAndTrack } = await import('./100_Hands');
        console.log(`Results from 100 random hands: `);
        console.log(generateHandsAndTrack());
    } else if (args.includes('-simulate_round')) {
        const { simulateRound } = await import('./Simulate_Round');
        simulateRound();
    } else {
        console.log('Invalid argument or no argument passed.');
    }
};

const args = process.argv.slice(2);
runSimulation(args);