import ClickFilter from '../utils/abstract-classes/clickFilterClass';
import filtersElements from '../data/filters-elements';
import createEl from '../utils/create-el';
import ICard from '../utils/interfaces/ICard';
import { set, get } from '../utils/storage';

class PopularityFilter extends ClickFilter {
  container?: HTMLElement;

  relevantValue?: string[];

  generateFilter(filterOptions: string[]): void {
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

  handleClick(e: Event): void {
    const currentEventTarget = e.target;

    if (currentEventTarget && currentEventTarget instanceof HTMLButtonElement) {
      const isPopular = currentEventTarget.classList.contains('checked');

      isPopular ? this.relevantValue?.pop() : this.relevantValue?.push('popular');

      currentEventTarget.classList.toggle('checked');

      set('popularityFilter', this.relevantValue);
    }
  }

  filterData(relevantGoods: ICard[]): ICard[] {
    let filtredGoods: ICard[] = relevantGoods;

    if (this.relevantValue?.length) {
      filtredGoods = relevantGoods.filter((item) => item.popular);
    }

    return filtredGoods;
  }

  reset(): void {
    const popularityFiltersElements = this.container?.querySelectorAll('.filters__popularity');

    popularityFiltersElements?.forEach((element) => element.classList.remove('checked'));

    this.relevantValue = get('popularityFilter', '[]');
  }
}

export default PopularityFilter;
