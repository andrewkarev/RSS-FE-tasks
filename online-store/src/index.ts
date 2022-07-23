import './style/main.scss';
import 'nouislider/dist/nouislider.css';
import App from './components/app/app';
import { get } from './components/utils/storage';
import IMenuItems from './components/utils/interfaces/iMenuItems';
import message from './selfEval';

const sortingOrder: string = get('sortingOption', '"ascending"');
const searchFieldValue: string = get('searchFieldValue', '""');
const brandFilterOptions: string[] = get('brandFilter', '[]');
const colorFilterOptions: string[] = get('colorFilter', '[]');
const storageFilterOptions: string[] = get('storageFilter', '[]');
const popularityFilterOption: string[] = get('popularityFilter', '[]');
const yearFilterOptions: string[] = get('yearFilter', '["2019", "2022"]');
const priceFilterOptions: string[] = get('priceFilter', '["1", "1299"]');
const quantityFilterOptions: string[] = get('quantityFilter', '["1", "19"]');
const menuItems: IMenuItems = {
  savedCards: get('savedItems', '[]'),
  cardsInCart: get('shoppingCart', '[]'),
};

const app = new App();

app.init(
  sortingOrder,
  menuItems,
  searchFieldValue,
  brandFilterOptions,
  colorFilterOptions,
  storageFilterOptions,
  popularityFilterOption,
  yearFilterOptions,
  priceFilterOptions,
  quantityFilterOptions,
);

console.log(message);
