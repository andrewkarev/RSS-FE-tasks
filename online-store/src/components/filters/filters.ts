import BrandFilter from './brandFilter';
import ColorFilter from './colorFilter';
import StorageFilter from './storageFilter';
import PopularityFilter from './popularityFilter';
import YearFilter from './yearFilter';
import PriceFilter from './priceFilter';
import QuantityFilter from './quantityFilter';

class Filters {
  brandFilter: BrandFilter;

  colorFilter: ColorFilter;

  storageFilter: StorageFilter;

  popularityFilter: PopularityFilter;

  yearFilter: YearFilter;

  priceFilter: PriceFilter;

  quantityFilter: QuantityFilter;

  constructor() {
    this.brandFilter = new BrandFilter();
    this.colorFilter = new ColorFilter();
    this.storageFilter = new StorageFilter();
    this.popularityFilter = new PopularityFilter();
    this.yearFilter = new YearFilter();
    this.priceFilter = new PriceFilter();
    this.quantityFilter = new QuantityFilter();
  }

  generateFilters(
    brandfilterOptions: string[],
    colorFilterOptions: string[],
    storageFilterOptions: string[],
    popularityFilterOption: string[],
    yearFilterOptions: string[],
    priceFilterOptions: string[],
    quantityFilterOptions: string[],
  ): void {
    this.brandFilter.generateFilter(brandfilterOptions);
    this.colorFilter.generateFilter(colorFilterOptions);
    this.storageFilter.generateFilter(storageFilterOptions);
    this.popularityFilter.generateFilter(popularityFilterOption);
    this.yearFilter.generateFilter(yearFilterOptions);
    this.priceFilter.generateFilter(priceFilterOptions);
    this.quantityFilter.generateFilter(quantityFilterOptions);
  }
}

export default Filters;
