import { del } from '../utils/storage';
import localStorageItemsNames from '../data/localStorageItemsNames';

class ResetButtons {
  public filtersResetBtn?: HTMLElement;

  public totalResetBtn?: HTMLElement;

  public getButtons(): void {
    this.filtersResetBtn = document.querySelector('.filters__reset-btn--filters') as HTMLElement;
    this.totalResetBtn = document.querySelector('.filters__reset-btn--total') as HTMLElement;
  }

  public updateLocalStorage(e: Event): void {
    if (e.target === this.totalResetBtn) {
      localStorageItemsNames.forEach((name) => {
        if (name.match(/sortingOption|savedItems|shoppingCart/)) del(name);
      });
    }

    localStorageItemsNames.forEach((name) => {
      if (!name.match(/sortingOption|savedItems|shoppingCart/)) del(name);
    });
  }
}

export default ResetButtons;
