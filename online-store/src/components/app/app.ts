import goods from '../data/goodsDataBase';
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

  filtersKeys: (keyof Filters)[];

  relevantGoods: ICard[];

  constructor() {
    this.cards = new Cards();
    this.sorting = new Sort();
    this.navMenu = new NavMenu();
    this.search = new Search();
    this.filters = new Filters();
    this.resetButtons = new ResetButtons();
    this.filtersKeys = [];
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
  ): void {
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

    this.filtersKeys = Object.keys(this.filters) as (keyof Filters)[];

    this.updateGoodsAppearance();

    this.handleEvents();
  }

  handleEvents(): void {
    this.cards.cardsContainer?.addEventListener('click', (e) => this.navMenu.handleCardClick(e));

    this.sorting.sortingContainer?.addEventListener('click', (e) => {
      this.sorting.handleSortingClick(e);
      this.updateGoodsAppearance();
    });

    this.search.searchField?.addEventListener('input', () => {
      this.updateGoodsAppearance();
    });

    this.search.searchFieldResetBtn?.addEventListener('click', () => {
      const searchRequest = this.search.searchField;

      if (searchRequest) searchRequest.value = '';

      this.updateGoodsAppearance();
    });

    this.filters.brandFilter.container?.addEventListener('click', (e) => {
      this.filters.brandFilter.handleClick(e);
      this.updateGoodsAppearance();
    });

    this.filters.colorFilter.container?.addEventListener('click', (e) => {
      this.filters.colorFilter.handleClick(e);
      this.updateGoodsAppearance();
    });

    this.filters.storageFilter.container?.addEventListener('click', (e) => {
      this.filters.storageFilter.handleClick(e);
      this.updateGoodsAppearance();
    });

    this.filters.popularityFilter.container?.addEventListener('click', (e) => {
      this.filters.popularityFilter.handleClick(e);
      this.updateGoodsAppearance();
    });

    this.filters.yearFilter.yearSlider?.noUiSlider?.on('end', () => {
      this.filters.yearFilter.handleDrag();
      this.updateGoodsAppearance();
    });

    this.filters.priceFilter.priceSlider?.noUiSlider?.on('end', () => {
      this.filters.priceFilter.handleDrag();
      this.updateGoodsAppearance();
    });

    this.filters.quantityFilter.quantitySlider?.noUiSlider?.on('end', () => {
      this.filters.quantityFilter.handleDrag();
      this.updateGoodsAppearance();
    });

    this.resetButtons.filtersResetBtn?.addEventListener('click', (e) => {
      const searchRequest = this.search.searchField;

      if (searchRequest) searchRequest.value = '';

      this.resetButtons.updateLocalStorage(e);

      this.filtersKeys.forEach((key) => {
        const filter = this.filters[key];
        if ('reset' in filter) filter.reset();
      });

      this.updateGoodsAppearance();
    });

    this.resetButtons.totalResetBtn?.addEventListener('click', (e) => {
      this.resetButtons.updateLocalStorage(e);
      document.location.reload();
    });
  }

  getRelevantGoods(): void {
    this.relevantGoods = this.search.filterData(goods);
    this.relevantGoods = this.sorting.sortGoods(this.relevantGoods);

    this.filtersKeys.forEach((key) => {
      const filter = this.filters[key];
      if ('filterData' in filter) this.relevantGoods = filter.filterData(this.relevantGoods);
    });
  }

  updateGoodsAppearance() {
    this.getRelevantGoods();
    this.cards.generateCards(this.relevantGoods);
  }
}

export default App;
