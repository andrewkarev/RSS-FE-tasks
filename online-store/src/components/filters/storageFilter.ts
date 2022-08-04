import ClickFilter from '../utils/abstract-classes/clickFilterClass';
import filtersElements from '../data/filtersElements';
import createEl from '../utils/createEl';
import ICard from '../utils/interfaces/ICard';
import { set as setLocalStorageValue, get as getLocalStorageValue } from '../utils/storage';

class StorageFilter extends ClickFilter {
  public container?: HTMLElement;

  protected relevantValue?: string[];

  public generateFilter(filterOptions: string[]): void {
    const currentFilter = filtersElements.storageFilter;

    this.container = document.querySelector(currentFilter.parentNodeName) as HTMLElement;
    this.relevantValue = filterOptions;

    currentFilter.elements.forEach((storageSize) => {
      const elementClasses = [...currentFilter.classNames];

      if (filterOptions.includes(storageSize)) elementClasses.push('checked');

      createEl(
        'button',
        elementClasses,
        `${currentFilter.pointer} ${storageSize} GB`,
        this.container,
        [currentFilter.attributes[0], currentFilter.attributes[1]],
        [currentFilter.name, storageSize],
      );
    });
  }

  public handleClick(e: Event): void {
    const currentEventTarget = e.target;

    if (currentEventTarget && currentEventTarget instanceof HTMLButtonElement) {
      const chosenValue = currentEventTarget.dataset.storage;
      let isChosen = false;

      if (chosenValue) isChosen = !!this.relevantValue?.includes(chosenValue);

      if (chosenValue && !isChosen) this.relevantValue?.push(chosenValue);

      if (chosenValue && isChosen) {
        this.relevantValue = this.relevantValue?.filter((value) => value !== chosenValue);
      }

      currentEventTarget.classList.toggle('checked');

      setLocalStorageValue('storageFilter', this.relevantValue);
    }
  }

  public filterData(relevantGoods: ICard[]): ICard[] {
    let filtredGoods: ICard[] = relevantGoods;

    if (this.relevantValue?.length) {
      filtredGoods = relevantGoods.filter((item) => this.relevantValue?.includes(`${item.storage}`));
    }

    return filtredGoods;
  }

  public reset(): void {
    const storageFiltersElements = this.container?.querySelectorAll('.filters__storage-memory');

    storageFiltersElements?.forEach((element) => element.classList.remove('checked'));

    this.relevantValue = getLocalStorageValue('storageFilter', '[]');
  }
}

export default StorageFilter;
