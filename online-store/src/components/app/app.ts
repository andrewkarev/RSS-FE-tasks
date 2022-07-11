import goods from '../data/goods-db';
import NavMenu from '../nav-menu/navMenu';
import ICard from '../utils/interfaces/ICard';
import IMenuItems from '../utils/interfaces/iMenuItems';
import Sort from '../cards-sort/sort';
import Cards from '../cards/cards';
import Search from '../search/search';
import Filters from '../filters/filters';

class App {
  cards: Cards;

  sorting: Sort;

  navMenu: NavMenu;

  search: Search;

  filters: Filters;

  relevantGoods: ICard[];

  constructor() {
    this.cards = new Cards();
    this.sorting = new Sort();
    this.navMenu = new NavMenu();
    this.search = new Search();
    this.filters = new Filters();
    this.relevantGoods = goods;
  }

  init(
    sortingOrder: string,
    menuItems: IMenuItems,
    searchFieldValue: string,
    brandFilterOptions: string[],
  ) {
    this.navMenu.initMenu(menuItems);

    this.search.getSearchField(searchFieldValue);
    this.sorting.generateSorting(sortingOrder);
    this.filters.generateFilters(brandFilterOptions);

    this.getRelevantGoods();

    this.cards.generateCards(this.relevantGoods);

    this.handleEvents();
  }

  handleEvents(): void {
    this.cards.cardsContainer?.addEventListener('click', (e) => this.navMenu.handleCardClick(e));

    this.sorting.sortingContainer?.addEventListener('click', (e) => {
      this.getRelevantGoods();
      this.sorting.handleSortingClick(e);
      this.relevantGoods = this.sorting.sortGoods(this.relevantGoods);
      this.cards.generateCards(this.relevantGoods);
    });

    this.search.searchField?.addEventListener('input', () => {
      this.getRelevantGoods();
      this.relevantGoods = this.search.filterData(this.relevantGoods);
      this.cards.generateCards(this.relevantGoods);
    });

    this.search.searchFieldResetBtn?.addEventListener('click', () => {
      const searchRequest = this.search.searchField;

      if (searchRequest) searchRequest.value = '';

      this.getRelevantGoods();
      this.cards.generateCards(this.relevantGoods);
    });

    this.filters.brandFilter.container?.addEventListener('click', (e) => {
      this.filters.brandFilter.handleClick(e);
      this.getRelevantGoods();
      this.relevantGoods = this.filters.brandFilter.filterData(this.relevantGoods);
      this.cards.generateCards(this.relevantGoods);
    });
  }

  getRelevantGoods() {
    this.relevantGoods = this.search.filterData(goods);
    this.relevantGoods = this.filters.brandFilter.filterData(this.relevantGoods);
    this.relevantGoods = this.sorting.sortGoods(this.relevantGoods);

    console.log(this.relevantGoods);
  }
}

export default App;
