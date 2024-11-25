import { Card, removeRandomFromSet } from "./app";

export class Round {
    public publicCards: Card[];

    constructor(publicCards: Card[]) {
        if (publicCards.length > 5) {
            throw new Error("A maximum of 5 cards can be shown.")
        }
        this.publicCards = publicCards;
    }

    getPublicCards(): Card[] {
        return this.publicCards
    }

    generatePublicCards(deck: Set<Card>) {
        this.publicCards = []
        for (let i = 0; i < 3; i++) {
            this.publicCards.push(removeRandomFromSet(deck));
        }
    }

    addPublicCard(deck: Set<Card>): Card {
        const newCard: Card = removeRandomFromSet(deck);
        this.publicCards.push(newCard);
        return newCard;
    }
}