import goods from '../data/goods-db';
import NavMenu from '../nav-menu/navMenu';
import ICard from '../utils/interfaces/ICard';
import IMenuItems from '../utils/interfaces/iMenuItems';
import Sort from '../cards-sort/sort';
import Cards from '../cards/cards';

class App {
  cards: Cards;

  sorting: Sort;

  navMenu: NavMenu;

  relevantGoods: ICard[];

  constructor() {
    this.cards = new Cards();
    this.sorting = new Sort();
    this.navMenu = new NavMenu();
    this.relevantGoods = goods;
  }

  init(sortingOrder: string, menuItems: IMenuItems) {
    this.navMenu.initMenu(menuItems);

    const chosenGoods = Sort.sort(this.relevantGoods, sortingOrder);
    this.cards.generateCards(chosenGoods);
    this.sorting.generateSorting();
    this.handleEvents();
  }

  handleEvents(): void {
    this.cards.cardsContainer?.addEventListener('click', (e) => this.navMenu.handleCardClick(e));
    this.sorting.sortingContainer?.addEventListener('click', (e) => {
      const chosenGoods: ICard[] = this.sorting.handleSortingClick(e, this.relevantGoods);
      this.cards.generateCards(chosenGoods);
    });
  }
}

export default App;
