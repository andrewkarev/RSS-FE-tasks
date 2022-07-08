/* eslint-disable no-unused-expressions */
import Card from '../card/card';
import goods from '../data/goods-db';
import AppMenu from '../appMenu/appMenu';
import ICard from '../utils/interfaces/ICard';

class App {
  cards: Card[];

  cardsContainer?: Node;

  menu: AppMenu;

  constructor() {
    this.cards = [];
    // Should get from local storage
    this.menu = new AppMenu(0, 0);
  }

  init(sortingOrder: string) {
    const relevantGoods: ICard[] = goods;

    const chosenGoods = App.sort(relevantGoods, sortingOrder);
    this.generateCards(chosenGoods);
  }

  generateCards(chosenGoods: ICard[]): void {
    this.cardsContainer = document.querySelector('.goods') as Node;

    chosenGoods.forEach((item) => {
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

  static sort(relevantGoods: ICard[], sortingOrder: string) {
    if (sortingOrder === 'oldest') {
      relevantGoods.sort((a, b) => a.year - b.year);
    }

    if (sortingOrder === 'newest') {
      relevantGoods.sort((a, b) => b.year - a.year);
    }

    if (sortingOrder === 'highest') {
      relevantGoods.sort((a, b) => b.price - a.price);
    }

    if (sortingOrder === 'lowest') {
      relevantGoods.sort((a, b) => a.price - b.price);
    }

    if (sortingOrder === 'name-increasing') {
      relevantGoods.sort((a, b) => {
        const nameA: string = a.model.toLowerCase();
        const nameB: string = b.model.toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }

    if (sortingOrder === 'name-decreasing') {
      relevantGoods.sort((a, b) => {
        const nameA: string = a.model.toLowerCase();
        const nameB: string = b.model.toLowerCase();

        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      });
    }

    return relevantGoods;
  }
}

export default App;
