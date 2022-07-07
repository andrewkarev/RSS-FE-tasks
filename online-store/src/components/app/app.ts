import Card from '../card/card';
import goods from '../data/goods-db';

class App {
  cards: Card[];

  cardsContainer?: Node;

  constructor() {
    this.cards = [];
  }

  generateCards() {
    this.cardsContainer = document.querySelector('.goods') as Node;

    goods.forEach((item) => {
      const card = new Card(item);
      card.create();

      this.cards.push(card);

      if (card.div) {
        this.cardsContainer?.appendChild(card.div);
      }
    });
  }
}

export default App;
