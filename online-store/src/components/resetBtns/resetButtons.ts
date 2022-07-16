import { del } from '../utils/storage';

class ResetButtons {
  filtersResetBtn?: HTMLElement;

  totalResetBtn?: HTMLElement;

  getButtons(): void {
    this.filtersResetBtn = document.querySelector('.filters__reset-btn--filters') as HTMLElement;
    this.totalResetBtn = document.querySelector('.filters__reset-btn--total') as HTMLElement;
  }

  updateLocalStorage(e: Event): void {
    if (e.target === this.totalResetBtn) {
      del('sortingOption');
      del('savedItems');
      del('shoppingCart');
    }

    del('brandFilter');
    del('colorFilter');
    del('storageFilter');
    del('popularityFilter');
    del('yearFilter');
    del('priceFilter');
    del('searchFieldValue');
    del('quantityFilter');
  }
}

export default ResetButtons;
