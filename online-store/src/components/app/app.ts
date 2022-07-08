/* eslint-disable no-unused-expressions */
import Card from '../card/card';
import goods from '../data/goods-db';
import AppMenu from '../appMenu/appMenu';

class App {
  cards: Card[];

  cardsContainer?: Node;

  menu: AppMenu;

  constructor() {
    this.cards = [];
    // Should get from local storage
    this.menu = new AppMenu(0, 0);
  }

  generateCards(): void {
    this.cardsContainer = document.querySelector('.goods') as Node;

    goods.forEach((item) => {
      const card = new Card(item);
      card.create();

      this.cards.push(card);

      if (card.div) {
        this.cardsContainer?.appendChild(card.div);
      }
    });

    this.handleEvents();
  }

  handleEvents(): void {
    this.cardsContainer?.addEventListener('click', (e) => {
      const currentTarget = e.target;

      let card: HTMLElement | null = null;
      let isSaveBtn = false;

      if (currentTarget instanceof HTMLElement) {
        card = currentTarget.closest('.goods__card');
        isSaveBtn = currentTarget.classList.contains('goods__save-button');
      }

      if (card && !isSaveBtn) {
        const buyBtn = card.querySelector('.goods__buy-button');

        if (buyBtn) {
          buyBtn.classList.contains('checked')
            ? this.menu.handleCardClick(buyBtn, isSaveBtn, 'decrease')
            : this.menu.handleCardClick(buyBtn, isSaveBtn, 'increase');
        }
      }

      if (card && isSaveBtn) {
        const saveBtn = card.querySelector('.goods__save-button');

        if (saveBtn) {
          saveBtn.classList.contains('checked')
            ? this.menu.handleCardClick(saveBtn, isSaveBtn, 'decrease')
            : this.menu.handleCardClick(saveBtn, isSaveBtn, 'increase');
        }
      }
    });
  }
}

export default App;
