import { Hand } from "./Hand";
import { randomHand } from "./app";

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

// Generate 100 hands and log the number of occurances.
console.log(`Result from 100 random hands: `);
console.log(generateHandsAndTrack());