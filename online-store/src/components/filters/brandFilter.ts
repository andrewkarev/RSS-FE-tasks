import ClickFilter from '../utils/abstract-classes/clickFilterClass';
import filtersElements from '../data/filtersElements';
import createEl from '../utils/createEl';
import ICard from '../utils/interfaces/ICard';
import { set, get } from '../utils/storage';

class BrandFilter extends ClickFilter {
  container?: HTMLElement;

  relevantValue?: string[];

  generateFilter(filterOptions: string[]): void {
    const currentFilter = filtersElements.brandFilter;

    this.container = document.querySelector(currentFilter.parentNodeName) as HTMLElement;
    this.relevantValue = filterOptions;

    currentFilter.elements.forEach((brand) => {
      const elementClasses = [...currentFilter.classNames];

      if (filterOptions.includes(brand)) elementClasses.push('checked');

      createEl(
        'button',
        elementClasses,
        `${currentFilter.pointer} ${brand}`,
        this.container,
        [currentFilter.attributes[0], currentFilter.attributes[1]],
        [currentFilter.name, brand],
      );
    });
  }

  handleClick(e: Event): void {
    const currentEventTarget = e.target;

    if (currentEventTarget && currentEventTarget instanceof HTMLButtonElement) {
      const chosenValue = currentEventTarget.dataset.brand;
      let isChosen = false;

      if (chosenValue) isChosen = !!this.relevantValue?.includes(chosenValue);

      if (chosenValue && !isChosen) this.relevantValue?.push(chosenValue);

      if (chosenValue && isChosen) {
        this.relevantValue = this.relevantValue?.filter((value) => value !== chosenValue);
      }

      currentEventTarget.classList.toggle('checked');

      set('brandFilter', this.relevantValue);
    }
  }

  filterData(relevantGoods: ICard[]): ICard[] {
    let filtredGoods: ICard[] = relevantGoods;

    if (this.relevantValue?.length) {
      filtredGoods = relevantGoods.filter((item) => this.relevantValue?.includes(item.brand));
    }

    return filtredGoods;
  }

  reset(): void {
    const brandFiltersElements = this.container?.querySelectorAll('.filters__brand');

    brandFiltersElements?.forEach((element) => element.classList.remove('checked'));

    this.relevantValue = get('brandFilter', '[]');
  }
}

export default BrandFilter;
