import ClickFilter from '../utils/abstract-classes/clickFilter';
import filtersElements from '../data/filtersElements';
import createEl from '../utils/createEl';
import ICard from '../utils/interfaces/ICard';
import { set as setLocalStorageValue, get as getLocalStorageValue } from '../utils/storage';

class PopularityFilter extends ClickFilter {
  public container?: HTMLElement;

  protected relevantValue?: string[];

  public generateFilter(filterOptions: string[]): void {
    const currentFilter = filtersElements.popularityFilter;

    this.container = document.querySelector(currentFilter.parentNodeName) as HTMLElement;
    this.relevantValue = filterOptions;

    currentFilter.elements.forEach((item) => {
      const elementClasses = [...currentFilter.classNames];

      if (this.relevantValue?.length) elementClasses.push('checked');

      createEl(
        'button',
        elementClasses,
        `${currentFilter.pointer} ${item}`,
        this.container,
        [currentFilter.attributes[0], currentFilter.attributes[1]],
        [currentFilter.name, 'true'],
      );
    });
  }

  public handleClick(e: Event): void {
    const currentEventTarget = e.target;

    if (currentEventTarget && currentEventTarget instanceof HTMLButtonElement) {
      const isPopular = currentEventTarget.classList.contains('checked');

      isPopular ? this.relevantValue?.pop() : this.relevantValue?.push('popular');

      currentEventTarget.classList.toggle('checked');

      setLocalStorageValue('popularityFilter', this.relevantValue);
    }
  }

  public filterData(relevantGoods: ICard[]): ICard[] {
    let filtredGoods: ICard[] = relevantGoods;

    if (this.relevantValue?.length) {
      filtredGoods = relevantGoods.filter((item) => item.popular);
    }

    return filtredGoods;
  }

  public reset(): void {
    const popularityFiltersElements = this.container?.querySelectorAll('.filters__popularity');

    popularityFiltersElements?.forEach((element) => element.classList.remove('checked'));

    this.relevantValue = getLocalStorageValue('popularityFilter', '[]');
  }
}

export default PopularityFilter;
