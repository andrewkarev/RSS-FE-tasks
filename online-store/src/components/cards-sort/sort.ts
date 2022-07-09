import sortingElements from '../data/sorting-elements';
import createEl from '../utils/create-el';
import ICard from '../utils/interfaces/ICard';
import { get } from '../utils/storage';

class Sort {
  sortingContainer?: HTMLElement;

  // Add param chosenSorting
  generateSorting() {
    this.sortingContainer = document.querySelector('.sorting') as HTMLElement;

    const sortingTitle = createEl('h2', 'sorting__title', 'Sort by:');
    this.sortingContainer?.appendChild(sortingTitle);

    const sortingOrder: string = get('sortingOption', '"ascending"');

    sortingElements.forEach((element) => {
      const elementClasses = element.classes;

      if (element.sortID === sortingOrder) elementClasses.push('active');

      const sortingEl = createEl('div', elementClasses, element.content, this.sortingContainer, ['sortId', element.sortID]);
      this.sortingContainer?.appendChild(sortingEl);
    });
  }

  static sort(relevantGoods: ICard[], sortingOrder: string) {
    if (sortingOrder === 'oldest') relevantGoods.sort((a, b) => a.year - b.year);

    if (sortingOrder === 'newest') relevantGoods.sort((a, b) => b.year - a.year);

    if (sortingOrder === 'most') relevantGoods.sort((a, b) => b.quantity - a.quantity);

    if (sortingOrder === 'least') relevantGoods.sort((a, b) => a.quantity - b.quantity);

    if (sortingOrder === 'ascending') {
      relevantGoods.sort((a, b) => {
        const nameA: string = a.model.toLowerCase();
        const nameB: string = b.model.toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }

    if (sortingOrder === 'descending') {
      relevantGoods.sort((a, b) => {
        const nameA: string = a.model.toLowerCase();
        const nameB: string = b.model.toLowerCase();

        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      });
    }

    return relevantGoods;
  }
}

export default Sort;
