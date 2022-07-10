import Card from '../card/card';
import ICard from '../utils/interfaces/ICard';

class Cards {
  cardsContainer?: HTMLElement;

  generateCards(chosenGoods: ICard[]): void {
    this.cardsContainer = document.querySelector('.goods') as HTMLElement;

    this.cardsContainer.innerHTML = '';

    chosenGoods.forEach((item) => {
      const card = new Card(item);
      card.create();

      if (card.div) {
        this.cardsContainer?.appendChild(card.div);
      }
    });
  }
}

export default Cards;
