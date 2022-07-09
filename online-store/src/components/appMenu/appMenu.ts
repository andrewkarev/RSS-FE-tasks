import IMenuItems from '../utils/interfaces/iMenuItems';
import { set } from '../utils/storage';

class AppMenu {
  savedItems?: HTMLElement;

  shoppingCart?: HTMLElement;

  savedItemsStorage: string[];

  shoppingCartStorage: string[];

  constructor() {
    this.savedItemsStorage = [];
    this.shoppingCartStorage = [];
  }

  initMenu({ savedCards, cardsInCart }: IMenuItems) {
    this.savedItems = document.querySelector('.header__nav-counter--saved-items') as HTMLElement;
    this.shoppingCart = document.querySelector('.header__nav-counter--bag') as HTMLElement;

    this.savedItemsStorage = savedCards;
    this.shoppingCartStorage = cardsInCart;

    this.savedItems.textContent = `${this.savedItemsStorage.length}`;
    this.shoppingCart.textContent = `${this.shoppingCartStorage.length}`;

    if (this.savedItemsStorage.length > 0) this.savedItems.classList.add('active');
    if (this.shoppingCartStorage.length > 0) this.shoppingCart.classList.add('active');
  }

  handleCardClick(element: Element, isSaveBtn: boolean, direction: 'increase' | 'decrease', cardSerialNum: string): void {
    const currentElement = element;
    element.classList.toggle('checked');

    if (isSaveBtn) {
      if (direction === 'decrease') {
        currentElement.textContent = 'Save';
        this.savedItemsStorage = this.savedItemsStorage.filter((item) => item !== cardSerialNum);
      }

      if (direction === 'increase') {
        currentElement.textContent = '✔';
        this.savedItemsStorage.push(cardSerialNum);
      }

      if (this.savedItems) this.savedItems.textContent = `${this.savedItemsStorage.length}`;

      if (this.savedItemsStorage.length > 0) {
        this.savedItems?.classList.add('active');
      } else {
        this.savedItems?.classList.remove('active');
      }

      set('savedItems', this.savedItemsStorage);
    }

    if (!isSaveBtn) {
      if (direction === 'decrease') {
        currentElement.textContent = 'Buy';
        this.shoppingCartStorage = this.shoppingCartStorage
          .filter((item) => item !== cardSerialNum);
      }

      if (direction === 'increase') {
        currentElement.textContent = '✔';
        this.shoppingCartStorage.push(cardSerialNum);
      }

      if (this.shoppingCart) this.shoppingCart.textContent = `${this.shoppingCartStorage.length}`;

      if (this.shoppingCartStorage.length > 0) {
        this.shoppingCart?.classList.add('active');
      } else {
        this.shoppingCart?.classList.remove('active');
      }

      set('shoppingCart', this.shoppingCartStorage);
    }
  }
}

export default AppMenu;
