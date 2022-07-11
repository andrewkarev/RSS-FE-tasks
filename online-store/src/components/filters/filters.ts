import filtersElements from '../data/filters-elements';
import createEl from '../utils/create-el';

class Filters {
  brandFilter?: HTMLElement;

  colorFilter?: HTMLElement;

  storageFilter?: HTMLElement;

  popularityFilter?: HTMLElement;

  generateFilters(): void {
    this.generateBrandFilter();
    this.generateColorFilter();
    this.generateStorageSizeFilter();
    this.generatePopularityFilter();
  }

  generateBrandFilter(): void {
    const currentFilter = filtersElements.brandFilter;

    this.brandFilter = document.querySelector(currentFilter.parentNodeName) as HTMLElement;

    currentFilter.elements.forEach((brand) => {
      createEl(
        'button',
        currentFilter.classNames,
        `${currentFilter.pointer} ${brand}`,
        this.brandFilter,
        [currentFilter.attributes[0], currentFilter.attributes[1]],
        [currentFilter.name, brand],
      );
    });
  }

  generateColorFilter(): void {
    const currentFilter = filtersElements.colorFilter;

    this.colorFilter = document.querySelector(currentFilter.parentNodeName) as HTMLElement;

    currentFilter.elements.forEach((color, idx) => {
      const currentClassNames = currentFilter.classNames.slice(0, 2);
      currentClassNames.push(currentFilter.classNames[idx + 2]);

      createEl(
        'button',
        currentClassNames,
        undefined,
        this.colorFilter,
        [currentFilter.attributes[0], currentFilter.attributes[1]],
        [currentFilter.name, color],
      );
    });
  }

  generateStorageSizeFilter(): void {
    const currentFilter = filtersElements.storageFilter;

    this.storageFilter = document.querySelector(currentFilter.parentNodeName) as HTMLElement;

    currentFilter.elements.forEach((storageSize) => {
      createEl(
        'button',
        currentFilter.classNames,
        `${currentFilter.pointer} ${storageSize} GB`,
        this.storageFilter,
        [currentFilter.attributes[0], currentFilter.attributes[1]],
        [currentFilter.name, storageSize],
      );
    });
  }

  generatePopularityFilter(): void {
    const currentFilter = filtersElements.popularityFilter;

    this.popularityFilter = document.querySelector(currentFilter.parentNodeName) as HTMLElement;

    currentFilter.elements.forEach((item) => {
      createEl(
        'button',
        currentFilter.classNames,
        `${currentFilter.pointer} ${item}`,
        this.popularityFilter,
        [currentFilter.attributes[0], currentFilter.attributes[1]],
      );
    });
  }
}

export default Filters;
