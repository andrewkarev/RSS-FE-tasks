import goods from '../data/goods-db';
import AppMenu from '../appMenu/appMenu';
import ICard from '../utils/interfaces/ICard';
import IMenuItems from '../utils/interfaces/iMenuItems';
import Sort from '../cards-sort/sort';
import Cards from '../cards/cards';

class App {
  cards: Cards;

  sorting: Sort;

  menu: AppMenu;

  constructor() {
    this.cards = new Cards();
    this.sorting = new Sort();
    this.menu = new AppMenu();
  }

  init(sortingOrder: string, menuItems: IMenuItems) {
    this.menu.initMenu(menuItems);

    const relevantGoods: ICard[] = goods;

    // Implement render function
    const chosenGoods = Sort.sort(relevantGoods, sortingOrder);
    this.cards.generateCards(chosenGoods);
    this.sorting.generateSorting();
    this.handleEvents();
  }

  handleEvents(): void {
    this.cards.cardsContainer?.addEventListener('click', (e) => this.menu.handleCardClick(e));
  }
}

export default App;
