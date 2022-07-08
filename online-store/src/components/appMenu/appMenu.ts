class AppMenu {
  savedItems?: HTMLElement;

  shoppingCart?: HTMLElement;

  savedItemsCounter: number;

  shoppingCartCounter: number;

  constructor(savedItemsCounter: number, shoppingCartCounter: number) {
    this.savedItemsCounter = savedItemsCounter;
    this.shoppingCartCounter = shoppingCartCounter;
  }

  handleCardClick(element: Element, isSaveBtn: boolean, direction: 'increase' | 'decrease'): void {
    const currentElement = element;
    element.classList.toggle('checked');

    if (isSaveBtn) {
      this.savedItems = document.querySelector('.header__nav-counter--saved-items') as HTMLElement;

      if (direction === 'decrease') {
        this.savedItemsCounter -= 1;
        currentElement.textContent = 'Save';
      }

      if (direction === 'increase') {
        this.savedItemsCounter += 1;
        currentElement.textContent = '✔';
      }

      this.savedItems.textContent = `${this.savedItemsCounter}`;

      if (this.savedItemsCounter > 0) {
        this.savedItems?.classList.add('active');
      } else {
        this.savedItems?.classList.remove('active');
      }
    }

    if (!isSaveBtn) {
      this.shoppingCart = document.querySelector('.header__nav-counter--bag') as HTMLElement;

      if (direction === 'decrease') {
        this.shoppingCartCounter -= 1;
        currentElement.textContent = 'Buy';
      }

      if (direction === 'increase') {
        this.shoppingCartCounter += 1;
        currentElement.textContent = '✔';
      }

      this.shoppingCart.textContent = `${this.shoppingCartCounter}`;

      if (this.shoppingCartCounter > 0) {
        this.shoppingCart?.classList.add('active');
      } else {
        this.shoppingCart?.classList.remove('active');
      }
    }
  }
}

export default AppMenu;
