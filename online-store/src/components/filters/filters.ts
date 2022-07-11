import BrandFilter from './brandFilter';
import ColorFilter from './colorFilter';
import StorageFilter from './storageFilter';
import PopularityFilter from './popularityFilter';

class Filters {
  brandFilter: BrandFilter;

  colorFilter: ColorFilter;

  storageFilter: StorageFilter;

  popularityFilter: PopularityFilter;

  constructor() {
    this.brandFilter = new BrandFilter();
    this.colorFilter = new ColorFilter();
    this.storageFilter = new StorageFilter();
    this.popularityFilter = new PopularityFilter();
  }

  generateFilters(brandfilterOptions: string[]): void {
    this.brandFilter.generateFilter(brandfilterOptions);
    this.colorFilter.generateFilter();
    this.storageFilter.generateFilter();
    this.popularityFilter.generateFilter();
  }
}

export default Filters;
