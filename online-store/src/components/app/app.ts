/* eslint-disable no-unused-expressions */
import Card from '../card/card';
import goods from '../data/goods-db';
import AppMenu from '../appMenu/appMenu';
import ICard from '../utils/interfaces/ICard';
import IMenuItems from '../utils/interfaces/iMenuItems';
import Sort from '../cards-sort/sort';

class App {
  cards: Card[];

  cardsContainer?: Node;

  sorting: Sort;

  menu: AppMenu;

  constructor() {
    this.cards = [];
    this.sorting = new Sort();
    this.menu = new AppMenu();
  }

  init(sortingOrder: string, menuItems: IMenuItems) {
    this.menu.initMenu(menuItems);

    const relevantGoods: ICard[] = goods;

    // Implement render function
    const chosenGoods = Sort.sort(relevantGoods, sortingOrder);
    this.generateCards(chosenGoods);
    this.sorting.generateSorting();
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
}

export default App;
