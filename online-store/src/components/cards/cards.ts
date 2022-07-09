import Card from '../card/card';
import ICard from '../utils/interfaces/ICard';

class Cards {
  cards: Card[];

  cardsContainer?: HTMLElement;

  constructor() {
    this.cards = [];
  }

  generateCards(chosenGoods: ICard[]): void {
    this.cardsContainer = document.querySelector('.goods') as HTMLElement;

    chosenGoods.forEach((item) => {
      const card = new Card(item);
      card.create();

      this.cards.push(card);

      if (card.div) {
        this.cardsContainer?.appendChild(card.div);
      }
    });
  }
}

export default Cards;
