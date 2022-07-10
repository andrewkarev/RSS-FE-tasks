import goods from '../data/goods-db';
import NavMenu from '../nav-menu/navMenu';
import ICard from '../utils/interfaces/ICard';
import IMenuItems from '../utils/interfaces/iMenuItems';
import Sort from '../cards-sort/sort';
import Cards from '../cards/cards';
import Search from '../search/search';

class App {
  cards: Cards;

  sorting: Sort;

  navMenu: NavMenu;

  search: Search;

  relevantGoods: ICard[];

  constructor() {
    this.cards = new Cards();
    this.sorting = new Sort();
    this.navMenu = new NavMenu();
    this.search = new Search();
    this.relevantGoods = goods;
  }

  init(sortingOrder: string, menuItems: IMenuItems, searchFieldValue: string) {
    this.navMenu.initMenu(menuItems);

    const chosenGoods = Sort.sort(this.relevantGoods, sortingOrder);
    this.cards.generateCards(chosenGoods);
    this.sorting.generateSorting();
    this.search.getSearchField(searchFieldValue);

    this.handleEvents();
  }

  handleEvents(): void {
    this.cards.cardsContainer?.addEventListener('click', (e) => this.navMenu.handleCardClick(e));
    this.sorting.sortingContainer?.addEventListener('click', (e) => {
      const chosenGoods: ICard[] = this.sorting.handleSortingClick(e, this.relevantGoods);
      this.cards.generateCards(chosenGoods);
    });
    this.search.searchField?.addEventListener('input', () => {
      const chosenGoods: ICard[] = this.search.filterData(this.relevantGoods);
      this.cards.generateCards(chosenGoods);
    });
    this.search.searchFieldResetBtn?.addEventListener('click', () => {
      // Is filtering necessary?
      // const chosenGoods: ICard[] = this.search.filterData(this.relevantGoods);
      // this.cards.generateCards(chosenGoods);
      this.cards.generateCards(this.relevantGoods);
    });
  }
}

export default App;
// Find a way to combine sorting and filtrtion (i'm need function for prehandling goods data base)
// Render function necessary
