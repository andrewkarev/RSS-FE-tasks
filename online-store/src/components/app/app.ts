import goods from '../data/goods-db';
import NavMenu from '../nav-menu/navMenu';
import ICard from '../utils/interfaces/ICard';
import IMenuItems from '../utils/interfaces/iMenuItems';
import Sort from '../cards-sort/sort';
import Cards from '../cards/cards';
import Search from '../search/search';
import Filters from '../filters/filters';
import ResetButtons from '../resetBtns/resetButtons';

class App {
  cards: Cards;

  sorting: Sort;

  navMenu: NavMenu;

  search: Search;

  filters: Filters;

  resetButtons: ResetButtons;

  relevantGoods: ICard[];

  constructor() {
    this.cards = new Cards();
    this.sorting = new Sort();
    this.navMenu = new NavMenu();
    this.search = new Search();
    this.filters = new Filters();
    this.resetButtons = new ResetButtons();
    this.relevantGoods = goods;
  }

  init(
    sortingOrder: string,
    menuItems: IMenuItems,
    searchFieldValue: string,
    brandFilterOptions: string[],
    colorFilterOptions: string[],
    storageFilterOptions: string[],
    popularityFilterOption: string[],
    yearFilterOptions: string[],
    priceFilterOptions: string[],
    quantityFilterOptions: string[],
  ) {
    this.navMenu.initMenu(menuItems);

    this.resetButtons.getButtons();

    this.search.getSearchField(searchFieldValue);
    this.sorting.generateSorting(sortingOrder);
    this.filters.generateFilters(
      brandFilterOptions,
      colorFilterOptions,
      storageFilterOptions,
      popularityFilterOption,
      yearFilterOptions,
      priceFilterOptions,
      quantityFilterOptions,
    );

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

    this.filters.colorFilter.container?.addEventListener('click', (e) => {
      this.filters.colorFilter.handleClick(e);
      this.getRelevantGoods();
      this.relevantGoods = this.filters.colorFilter.filterData(this.relevantGoods);
      this.cards.generateCards(this.relevantGoods);
    });

    this.filters.storageFilter.container?.addEventListener('click', (e) => {
      this.filters.storageFilter.handleClick(e);
      this.getRelevantGoods();
      this.relevantGoods = this.filters.storageFilter.filterData(this.relevantGoods);
      this.cards.generateCards(this.relevantGoods);
    });

    this.filters.popularityFilter.container?.addEventListener('click', (e) => {
      this.filters.popularityFilter.handleClick(e);
      this.getRelevantGoods();
      this.relevantGoods = this.filters.popularityFilter.filterData(this.relevantGoods);
      this.cards.generateCards(this.relevantGoods);
    });

    this.filters.yearFilter.yearSlider?.noUiSlider?.on('end', () => {
      this.filters.yearFilter.handleDrag();
      this.getRelevantGoods();
      this.relevantGoods = this.filters.yearFilter.filterData(this.relevantGoods);
      this.cards.generateCards(this.relevantGoods);
    });

    this.filters.priceFilter.priceSlider?.noUiSlider?.on('end', () => {
      this.filters.priceFilter.handleDrag();
      this.getRelevantGoods();
      this.relevantGoods = this.filters.priceFilter.filterData(this.relevantGoods);
      this.cards.generateCards(this.relevantGoods);
    });

    this.filters.quantityFilter.quantitySlider?.noUiSlider?.on('end', () => {
      this.filters.quantityFilter.handleDrag();
      this.getRelevantGoods();
      this.relevantGoods = this.filters.quantityFilter.filterData(this.relevantGoods);
      this.cards.generateCards(this.relevantGoods);
    });

    this.resetButtons.filtersResetBtn?.addEventListener('click', (e) => {
      this.resetButtons.updateLocalStorage(e);

      this.filters.brandFilter.reset();
      this.filters.colorFilter.reset();
      this.filters.storageFilter.reset();
      this.filters.popularityFilter.reset();
      this.filters.yearFilter.reset();
      this.filters.priceFilter.reset();
      this.filters.quantityFilter.reset();

      const searchRequest = this.search.searchField;

      if (searchRequest) searchRequest.value = '';

      this.getRelevantGoods();
      this.cards.generateCards(this.relevantGoods);
    });

    this.resetButtons.totalResetBtn?.addEventListener('click', (e) => {
      this.resetButtons.updateLocalStorage(e);
      document.location.reload();
    });
  }

  getRelevantGoods() {
    this.relevantGoods = this.search.filterData(goods);
    this.relevantGoods = this.filters.brandFilter.filterData(this.relevantGoods);
    this.relevantGoods = this.filters.colorFilter.filterData(this.relevantGoods);
    this.relevantGoods = this.filters.storageFilter.filterData(this.relevantGoods);
    this.relevantGoods = this.filters.popularityFilter.filterData(this.relevantGoods);
    this.relevantGoods = this.filters.yearFilter.filterData(this.relevantGoods);
    this.relevantGoods = this.filters.priceFilter.filterData(this.relevantGoods);
    this.relevantGoods = this.filters.quantityFilter.filterData(this.relevantGoods);
    this.relevantGoods = this.sorting.sortGoods(this.relevantGoods);

    console.log(this.relevantGoods);
  }
}

export default App;
