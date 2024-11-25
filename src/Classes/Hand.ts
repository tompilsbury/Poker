import { Card, Rank, Suit} from "../app";

type HandType = 'Royal Flush' | 'Straight Flush' | 'Four of a Kind' | 'Full House' |
               'Flush' | 'Straight' | 'Three of a Kind' | 'Two Pair' | 'One Pair' | 'High Card';

export class Hand {
    private cards: Card[];
    
    constructor(cards: Card[]) {
        this.cards = cards;
    }

    toString(): string {
        return this.cards
            .map(card => `${card.rank}${card.suit}`)
            .join(", ");
    }

    getCards(): Card[] {
        return this.cards;
    }

    getHighestValue(): number {
        var highest = 0;
        for (var i = 0; i < this.cards.length; i++) {
            var num: number = valueToNum(this.cards[i].rank);
            highest = num > highest ? num : highest;
        }
        return highest;
    }

    getHandType(): HandType {
        const suits = this.cards.map(card => card.suit);
        const ranks = this.cards.map(card => valueToNum(card.rank));
        const rankCounts = this.countOccurrences(ranks);
        const suitCounts = this.countOccurrences(suits);
    
        // console.log(`Rank Counts: ${Array.from(rankCounts.values())}`);
        // console.log(`Suit Counts: ${Array.from(suitCounts.values())}`);
        
        const isFlush = Math.max(...Array.from(suitCounts.values())) >= 5;
        const isStraight = this.isStraight(ranks);
        const sortedRanks = [...ranks].sort((a, b) => a - b);
    
        if (isStraight && isFlush) {
            if (sortedRanks[0] === 10) return 'Royal Flush'; 
            return 'Straight Flush';
        }
        
        if (Array.from(rankCounts.values()).includes(4)) {
            return 'Four of a Kind';
        }
        
        if (Array.from(rankCounts.values()).includes(3) && Array.from(rankCounts.values()).includes(2)) {
            return 'Full House';
        }
    
        if (isFlush) {
            return 'Flush';
        }
    
        if (isStraight) {
            return 'Straight';
        }
    
        if (Array.from(rankCounts.values()).includes(3)) {
            return 'Three of a Kind';
        }
    
        const pairCount = Array.from(rankCounts.values()).filter(count => count === 2).length;
        if (pairCount >= 2) {
            return 'Two Pair';
        }
    
        if (Array.from(rankCounts.values()).includes(2)) {
            return 'One Pair';
        }
    
        // If no other hand is matched, it's a High Card
        return 'High Card';
    }
    

    private countOccurrences(arr: any[]): Map<any, number> {
        const countMap = new Map<any, number>();
        for (const item of arr) {
            countMap.set(item, (countMap.get(item) || 0) + 1);
        }
        return countMap;
    }

    private isStraight(ranks: number[]): boolean {
        const uniqueRanks = Array.from(new Set(ranks));
        if (uniqueRanks.length < 5) return false; // Straight needs at least 5 different ranks
        
        // Check for consecutive values
        const sortedRanks = uniqueRanks.sort((a, b) => a - b);
        for (let i = 0; i < sortedRanks.length - 1; i++) {
            if (sortedRanks[i] + 1 !== sortedRanks[i + 1]) return false;
        }
        return true;
    }

    getCard(index: number): Card {
        if (index < 0 || index > 7) {
            throw new Error("Card index out of range. Valid indices are 1-7.");
        }
        return this.cards[index];
    }

    setCard(index: number, card: Card): void {
        if (index < 0 || index > 7) {
            throw new Error("Card index out of range. Valid indices are 1-7.");
        }
        this.cards[index] = card;
    }
}

export const valueToNum = (value: Rank): number => {
    return value === 'A' ? 14
   : value === 'J' ? 11
   : value === 'Q' ? 12
   : value === 'K' ? 13
   : Number(value);
}

export const suitToNum = (suit: Suit): number => {
    return suit === '♥' ? 1
      : suit === '♦' ? 2
      : suit === '♠' ? 3
      : 4;
}