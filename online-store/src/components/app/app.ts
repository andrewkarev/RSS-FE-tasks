/* eslint-disable no-unused-expressions */
import Card from '../card/card';
import goods from '../data/goods-db';
import AppMenu from '../appMenu/appMenu';
import ICard from '../utils/interfaces/ICard';
import IMenuItems from '../utils/interfaces/iMenuItems';
import sortingElements from '../data/sorting-elements';
import createEl from '../utils/create-el';

class App {
  cards: Card[];

  cardsContainer?: Node;

  sortingContainer?: HTMLElement;

  menu: AppMenu;

  constructor() {
    this.cards = [];
    this.menu = new AppMenu();
  }

  init(sortingOrder: string, menuItems: IMenuItems) {
    this.menu.initMenu(menuItems);

    const relevantGoods: ICard[] = goods;

    // Implement render function
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
    // write out handler function as a part of module
    this.cardsContainer?.addEventListener('click', (e) => {
      const currentTarget = e.target;

      let card: HTMLElement | null = null;
      let isSaveBtn = false;
      let cardSerialNum = '';

      if (currentTarget instanceof HTMLElement) {
        card = currentTarget.closest('.goods__card');
        isSaveBtn = currentTarget.classList.contains('goods__save-button');
      }

      if (card && card?.dataset.serialNum) {
        cardSerialNum = card?.dataset.serialNum;
      }

      if (card && !isSaveBtn) {
        const buyBtn = card.querySelector('.goods__buy-button');

        if (buyBtn) {
          buyBtn.classList.contains('checked')
            ? this.menu.handleCardClick(buyBtn, isSaveBtn, 'decrease', cardSerialNum)
            : this.menu.handleCardClick(buyBtn, isSaveBtn, 'increase', cardSerialNum);
        }
      }

      if (card && isSaveBtn) {
        const saveBtn = card.querySelector('.goods__save-button');

        if (saveBtn) {
          saveBtn.classList.contains('checked')
            ? this.menu.handleCardClick(saveBtn, isSaveBtn, 'decrease', cardSerialNum)
            : this.menu.handleCardClick(saveBtn, isSaveBtn, 'increase', cardSerialNum);
        }
      }
    });
  }

  static sort(relevantGoods: ICard[], sortingOrder: string) {
    if (sortingOrder === 'oldest') relevantGoods.sort((a, b) => a.year - b.year);

    if (sortingOrder === 'newest') relevantGoods.sort((a, b) => b.year - a.year);

    if (sortingOrder === 'most') relevantGoods.sort((a, b) => b.price - a.price);

    if (sortingOrder === 'least') relevantGoods.sort((a, b) => a.price - b.price);

    if (sortingOrder === 'ascending') {
      relevantGoods.sort((a, b) => {
        const nameA: string = a.model.toLowerCase();
        const nameB: string = b.model.toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }

    if (sortingOrder === 'descending') {
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
