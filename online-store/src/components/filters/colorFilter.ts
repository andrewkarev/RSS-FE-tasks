import ClickFilter from '../utils/abstract-classes/clickFilterClass';
import filtersElements from '../data/filtersElements';
import createEl from '../utils/createEl';
import ICard from '../utils/interfaces/ICard';
import { set, get } from '../utils/storage';

class ColorFilter extends ClickFilter {
  container?: HTMLElement;

  relevantValue?: string[];

  generateFilter(filterOptions: string[]): void {
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

  handleClick(e: Event): void {
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

      set('colorFilter', this.relevantValue);
    }
  }

  filterData(relevantGoods: ICard[]): ICard[] {
    let filtredGoods: ICard[] = relevantGoods;

    if (this.relevantValue?.length) {
      filtredGoods = relevantGoods.filter((item) => this.relevantValue?.includes(item.color));
    }

    return filtredGoods;
  }

  reset(): void {
    const colorFiltersElements = this.container?.querySelectorAll('.filters__color');

    colorFiltersElements?.forEach((element) => element.classList.remove('checked'));

    this.relevantValue = get('colorFilter', '[]');
  }
}

export default ColorFilter;
