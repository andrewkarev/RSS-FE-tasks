import { burgerMenu, toggleMenu, closeMenu } from './modules/burger-menu.js';
import { petsCard, popupCloseButton, popup, showPopup, hoverCloseButton, closePopup } from './modules/popup.js';
import PETS from './modules/our-pets.js';

// Burger-menu
document.addEventListener('click', closeMenu);
burgerMenu.addEventListener('click', toggleMenu);

// Popup
petsCard.forEach(card => card.addEventListener('click', showPopup));
document.addEventListener('mouseover', hoverCloseButton);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('click', (e) => {
  const isPopupBlackout = e.target.classList.contains('popup--show');
  if (isPopupBlackout) {
    closePopup();
  }
});

