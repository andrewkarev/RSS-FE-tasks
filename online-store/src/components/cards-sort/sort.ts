import sortingElements from '../data/sortingElements';
import createEl from '../utils/createEl';
import ICard from '../utils/interfaces/ICard';
import { set as setLocalStorageValue } from '../utils/storage';

class Sort {
  public sortingContainer?: HTMLElement;

  private sortingOptions?: NodeListOf<Element>;

  private sortingOrder?: string;

  public generateSorting(sortingOrder: string) {
    this.sortingContainer = document.querySelector('.sorting') as HTMLElement;

    createEl('h2', 'sorting__title', 'Sort by:', this.sortingContainer);

    this.sortingOrder = sortingOrder;

    sortingElements.forEach((element) => {
      const elementClasses = [...element.classes];

      if (element.sortID === this.sortingOrder) elementClasses.push('active');

      createEl('div', elementClasses, element.content, this.sortingContainer, ['sortId', element.sortID]);
    });
  }

  public handleSortingClick(e: Event): void {
    if (!this.sortingOptions) {
      this.sortingOptions = this.sortingContainer?.querySelectorAll('.sorting__option') as NodeListOf<Element>;
    }

    const currentTarget = e.target;

    if (
      currentTarget instanceof HTMLElement
      && currentTarget.classList.contains('sorting__option')
      && currentTarget.dataset.sortId
    ) {
      const chosenSortingOrder = currentTarget.dataset.sortId;

      this.sortingOrder = chosenSortingOrder;

      this.sortingOptions?.forEach((option) => option.classList.remove('active'));

      currentTarget.classList.add('active');

      setLocalStorageValue('sortingOption', chosenSortingOrder);
    }
  }

  public sortGoods(relevantGoods: ICard[]): ICard[] {
    if (this.sortingOrder === 'oldest') relevantGoods.sort((a, b) => a.year - b.year);

    if (this.sortingOrder === 'newest') relevantGoods.sort((a, b) => b.year - a.year);

    if (this.sortingOrder === 'most') relevantGoods.sort((a, b) => b.quantity - a.quantity);

    if (this.sortingOrder === 'least') relevantGoods.sort((a, b) => a.quantity - b.quantity);

    if (this.sortingOrder === 'ascending') {
      relevantGoods.sort((a, b) => {
        const nameA: string = a.model.toLowerCase();
        const nameB: string = b.model.toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    }

    if (this.sortingOrder === 'descending') {
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
