import './style/main.scss';
import 'nouislider/dist/nouislider.css';
import App from './components/app/app';
import { get as getLocalStorageValue } from './components/utils/storage';
import IMenuItems from './components/utils/interfaces/iMenuItems';
import message from './selfEval';

const sortingOrder: string = getLocalStorageValue('sortingOption', '"ascending"');
const searchFieldValue: string = getLocalStorageValue('searchFieldValue', '""');
const brandFilterOptions: string[] = getLocalStorageValue('brandFilter', '[]');
const colorFilterOptions: string[] = getLocalStorageValue('colorFilter', '[]');
const storageFilterOptions: string[] = getLocalStorageValue('storageFilter', '[]');
const popularityFilterOption: string[] = getLocalStorageValue('popularityFilter', '[]');
const yearFilterOptions: string[] = getLocalStorageValue('yearFilter', '["2019", "2022"]');
const priceFilterOptions: string[] = getLocalStorageValue('priceFilter', '["1", "1299"]');
const quantityFilterOptions: string[] = getLocalStorageValue('quantityFilter', '["1", "19"]');
const menuItems: IMenuItems = {
  savedCards: getLocalStorageValue('savedItems', '[]'),
  cardsInCart: getLocalStorageValue('shoppingCart', '[]'),
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
