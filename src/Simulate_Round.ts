import { Hand } from "./Classes/Hand";
import { Round } from "./Classes/Round";
import { removeRandomFromSet, generateDeck } from "./app";


export const simulateRound = () => {
    // Simulated Poker round. Betting functionality not yet implemented.
    const round: Round = new Round([]);
    const hand: Hand = new Hand([]);
    const deck =  generateDeck();

    // First round
    hand.setCard(0, removeRandomFromSet(deck));
    hand.setCard(1, removeRandomFromSet(deck));
    console.log(hand.toString());
    console.log(hand.getHandType(), '\n')

    // Second round
    round.generatePublicCards(deck);
    const publicCards = round.getPublicCards();
    for (var i = 0; i < publicCards.length; i++) {
        hand.setCard(i+2, publicCards[i]);
    }
    console.log(hand.toString());
    console.log(hand.getHandType(), '\n')

    // Third round
    var newCard = round.addPublicCard(deck)
    hand.setCard(5, newCard);
    console.log(hand.toString());
    console.log(hand.getHandType(), '\n')

    // Final round
    var newCard = round.addPublicCard(deck)
    hand.setCard(6, newCard);
    console.log(hand.toString());
    console.log(hand.getHandType())
}
