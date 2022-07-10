import Card from '../card/card';
import ICard from '../utils/interfaces/ICard';

class Cards {
  renderedCards: Card[];

  cardsContainer?: HTMLElement;

  constructor() {
    this.renderedCards = [];
  }

  generateCards(chosenGoods: ICard[]): void {
    this.cardsContainer = document.querySelector('.goods') as HTMLElement;

    this.cardsContainer.innerHTML = '';

    chosenGoods.forEach((item) => {
      const card = new Card(item);
      card.create();

      this.renderedCards.push(card);

      if (card.div) {
        this.cardsContainer?.appendChild(card.div);
      }
    });
  }
}

export default Cards;
