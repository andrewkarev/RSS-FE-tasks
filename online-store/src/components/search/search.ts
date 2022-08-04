import ICard from '../utils/interfaces/ICard';
import { set as setLocalStorageValue } from '../utils/storage';

class Search {
  public searchField?: HTMLInputElement;

  public searchFieldResetBtn?: HTMLButtonElement;

  public initSearchField(searchFieldValue: string): void {
    this.searchField = document.querySelector('.header__search') as HTMLInputElement;
    this.searchFieldResetBtn = document.querySelector('.reset-btn') as HTMLButtonElement;

    if (this.searchField) this.searchField.value = searchFieldValue;
  }

  public filterData(relevantGoods: ICard[]): ICard[] {
    const searchRequest = this.searchField?.value;
    let filteredGoods: ICard[] = relevantGoods;
    let searchFieldValue = '';

    if (searchRequest) {
      searchFieldValue = searchRequest.toLowerCase();
      filteredGoods = relevantGoods.filter((item) => item.model
        .toLowerCase()
        .includes(searchFieldValue));
    }

    setLocalStorageValue('searchFieldValue', searchFieldValue);

    return filteredGoods;
  }
}

export default Search;
