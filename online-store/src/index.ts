import './style/main.scss';
import App from './components/app/app';
import { get } from './components/utils/storage';
import IMenuItems from './components/utils/interfaces/iMenuItems';

const sortingOrder: string = get('sortingOption', '"ascending"');
const searchFieldValue: string = get('searchFieldValue', '""');
const menuItems: IMenuItems = {
  savedCards: get('savedItems', '[]'),
  cardsInCart: get('shoppingCart', '[]'),
};
const brandFilterOptions: string[] = get('brandFilter', '[]');
const colorFilterOptions: string[] = get('colorFilter', '[]');
const storageFilterOptions: string[] = get('storageFilter', '[]');
const popularityFilterOption: string[] = get('popularityFilter', '[]');

const app = new App();

app.init(
  sortingOrder,
  menuItems,
  searchFieldValue,
  brandFilterOptions,
  colorFilterOptions,
  storageFilterOptions,
  popularityFilterOption,
);
