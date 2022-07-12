import createEl from '../utils/create-el';

class Popup {
  popupElement?: HTMLElement;

  parentElement?: HTMLElement;

  initPopupElement(): void {
    const popupInner = `
    <div class="popup__content">
      <h1 class="popup__title">Sorry.</h1>
      <h2 class="popup__subtitle">But there are no free slots left in the cart :(</h2>
      <button class="popup__reset-btn reset-btn" type="reset">
        <div class="reset-btn__line reset-btn__line-1 popup__reset-btn--line"></div>
        <div class="reset-btn__line reset-btn__line-2 popup__reset-btn--line"></div>
      </button>
    </div>
    `;

    if (!this.parentElement) {
      this.parentElement = document.querySelector('body') as HTMLElement;
    }

    this.popupElement = createEl('div', 'popup', popupInner);

    this.popupElement.addEventListener('click', () => {
      this.parentElement?.classList.remove('lock');
      this.popupElement?.remove();
    });
  }

  displayPopup(): void {
    this.parentElement?.classList.add('lock');

    if (this.popupElement) {
      this.parentElement?.append(this.popupElement);
    }
  }
}

export default Popup;
