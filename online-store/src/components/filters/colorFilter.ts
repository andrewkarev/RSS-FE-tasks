import ClickFilter from '../utils/abstract-classes/clickFilter';
import filtersElements from '../data/filtersElements';
import createEl from '../utils/createEl';
import ICard from '../utils/interfaces/ICard';
import { set as setLocalStorageValue, get as getLocalStorageValue } from '../utils/storage';

class ColorFilter extends ClickFilter {
  public container?: HTMLElement;

  protected relevantValue?: string[];

  public generateFilter(filterOptions: string[]): void {
    const currentFilter = filtersElements.colorFilter;

    this.container = document.querySelector(currentFilter.parentNodeName) as HTMLElement;
    this.relevantValue = filterOptions;

    currentFilter.elements.forEach((color, idx) => {
      const currentClassNames = currentFilter.classNames.slice(0, 2);

      currentClassNames.push(currentFilter.classNames[idx + 2]);

      if (filterOptions.includes(color)) currentClassNames.push('checked');

      createEl(
        'button',
        currentClassNames,
        undefined,
        this.container,
        [currentFilter.attributes[0], currentFilter.attributes[1]],
        [currentFilter.name, color],
      );
    });
  }

  public handleClick(e: Event): void {
    const currentEventTarget = e.target;

    if (currentEventTarget && currentEventTarget instanceof HTMLButtonElement) {
      const chosenValue = currentEventTarget.dataset.color;
      let isChosen = false;

      if (chosenValue) isChosen = !!this.relevantValue?.includes(chosenValue);

      if (chosenValue && !isChosen) this.relevantValue?.push(chosenValue);

      if (chosenValue && isChosen) {
        this.relevantValue = this.relevantValue?.filter((value) => value !== chosenValue);
      }

      currentEventTarget.classList.toggle('checked');

      setLocalStorageValue('colorFilter', this.relevantValue);
    }
  }

  public filterData(relevantGoods: ICard[]): ICard[] {
    let filtredGoods: ICard[] = relevantGoods;

    if (this.relevantValue?.length) {
      filtredGoods = relevantGoods.filter((item) => this.relevantValue?.includes(item.color));
    }

    return filtredGoods;
  }

  public reset(): void {
    const colorFiltersElements = this.container?.querySelectorAll('.filters__color');

    colorFiltersElements?.forEach((element) => element.classList.remove('checked'));

    this.relevantValue = getLocalStorageValue('colorFilter', '[]');
  }
}

export default ColorFilter;
