import { burgerMenu, toggleMenu, closeMenu } from './modules/burger-menu.js';
import { popupCloseButton, popup, showPopup, hoverCloseButton, closePopup } from './modules/popup.js';
import { buttonNext, buttonPrevious, pushSlide, shiftForward } from './modules/slider.js';
import PETS from './modules/our-pets.js';

// Burger-menu
document.addEventListener('click', closeMenu);
burgerMenu.addEventListener('click', toggleMenu);

// Popup
document.addEventListener('mouseover', hoverCloseButton);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('click', (e) => {
  const isPopupBlackout = e.target.classList.contains('popup--show');
  if (isPopupBlackout) {
    closePopup();
  }
});

// Slider
pushSlide();
buttonNext.addEventListener('click', shiftForward);
buttonPrevious.addEventListener('click', shiftForward);
