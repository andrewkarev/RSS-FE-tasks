import IMenuItems from '../utils/interfaces/iMenuItems';
import Popup from '../popup/menuPopup';
import { set } from '../utils/storage';

class NavMenu {
  savedItems?: HTMLElement;

  shoppingCart?: HTMLElement;

  savedItemsStorage: string[];

  shoppingCartStorage: string[];

  popup: Popup;

  constructor() {
    this.savedItemsStorage = [];
    this.shoppingCartStorage = [];
    this.popup = new Popup();
  }

  initMenu({ savedCards, cardsInCart }: IMenuItems): void {
    this.savedItems = document.querySelector('.header__nav-counter--saved-items') as HTMLElement;
    this.shoppingCart = document.querySelector('.header__nav-counter--bag') as HTMLElement;

    this.savedItemsStorage = savedCards;
    this.shoppingCartStorage = cardsInCart;

    this.savedItems.textContent = `${this.savedItemsStorage.length}`;
    this.shoppingCart.textContent = `${this.shoppingCartStorage.length}`;

    this.popup.initPopupElement();

    if (this.savedItemsStorage.length > 0) this.savedItems.classList.add('active');
    if (this.shoppingCartStorage.length > 0) this.shoppingCart.classList.add('active');
  }

  handleCardClick(e: Event): void {
    const currentTarget = e.target;

    let card: HTMLElement | null = null;
    let isSaveBtn = false;
    let cardSerialNum = '';

    if (currentTarget instanceof HTMLElement) {
      card = currentTarget.closest('.goods__card');
      isSaveBtn = currentTarget.classList.contains('goods__save-button');
    }

    if (card && card?.dataset.serialNum) cardSerialNum = card?.dataset.serialNum;

    if (card && !isSaveBtn) {
      this.handleAccordingToButtonType(card, isSaveBtn, '.goods__buy-button', cardSerialNum);
    }

    if (card && isSaveBtn) {
      this.handleAccordingToButtonType(card, isSaveBtn, '.goods__save-button', cardSerialNum);
    }
  }

  handleAccordingToButtonType(
    card: HTMLElement,
    isSaveBtn: boolean,
    className: string,
    cardSerialNum: string,
  ): void {
    const btn = card.querySelector(className);
    let itemsInCart = 0;

    if (!isSaveBtn) itemsInCart = this.shoppingCartStorage.length;

    if (!isSaveBtn && itemsInCart < 20 && btn) {
      btn.classList.contains('checked')
        ? this.changeCardState(btn, isSaveBtn, 'decrease', cardSerialNum)
        : this.changeCardState(btn, isSaveBtn, 'increase', cardSerialNum);
    }

    if (!isSaveBtn && itemsInCart >= 20 && btn && !btn.classList.contains('checked')) {
      this.popup.displayPopup();
    }

    if (!isSaveBtn && itemsInCart >= 20 && btn && btn.classList.contains('checked')) {
      this.changeCardState(btn, isSaveBtn, 'decrease', cardSerialNum);
    }

    if (isSaveBtn && btn) {
      btn.classList.contains('checked')
        ? this.changeCardState(btn, isSaveBtn, 'decrease', cardSerialNum)
        : this.changeCardState(btn, isSaveBtn, 'increase', cardSerialNum);
    }
  }

  changeCardState(element: Element, isSaveBtn: boolean, direction: 'increase' | 'decrease', cardSerialNum: string): void {
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

export default NavMenu;
