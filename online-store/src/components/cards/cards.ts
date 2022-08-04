import CardElement from '../card/card';
import ICard from '../utils/interfaces/ICard';

class Cards {
  public cardsContainer?: HTMLElement;

  public generateCards(chosenGoods: ICard[]): void {
    if (!this.cardsContainer) {
      this.cardsContainer = document.querySelector('.goods') as HTMLElement;
    }

    this.cardsContainer.innerHTML = '';

    chosenGoods.forEach((item) => {
      const card = new CardElement(item);
      card.create();

      if (card.div) {
        this.cardsContainer?.appendChild(card.div);
      }
    });

    if (!this.cardsContainer?.children.length) {
      this.cardsContainer.innerHTML = '<h2>Sorry, no matches found ¯\\_(ツ)_/¯</h2>';
    }
  }
}

export default Cards;
