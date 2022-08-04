import ClickFilter from '../utils/abstract-classes/clickFilterClass';
import filtersElements from '../data/filtersElements';
import createEl from '../utils/createEl';
import ICard from '../utils/interfaces/ICard';
import { set as setLocalStorageValue, get as getLocalStorageValue } from '../utils/storage';

class BrandFilter extends ClickFilter {
  public container?: HTMLElement;

  protected relevantValue?: string[];

  public generateFilter(filterOptions: string[]): void {
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

  public handleClick(e: Event): void {
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

      setLocalStorageValue('brandFilter', this.relevantValue);
    }
  }

  public filterData(relevantGoods: ICard[]): ICard[] {
    let filtredGoods: ICard[] = relevantGoods;

    if (this.relevantValue?.length) {
      filtredGoods = relevantGoods.filter((item) => this.relevantValue?.includes(item.brand));
    }

    return filtredGoods;
  }

  public reset(): void {
    const brandFiltersElements = this.container?.querySelectorAll('.filters__brand');

    brandFiltersElements?.forEach((element) => element.classList.remove('checked'));

    this.relevantValue = getLocalStorageValue('brandFilter', '[]');
  }
}

export default BrandFilter;
