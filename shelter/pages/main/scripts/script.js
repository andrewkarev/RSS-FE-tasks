import { burgerMenu, toggleMenu, closeMenu } from './modules/burger-menu.js';
import { popupCloseButton, popup, hoverCloseButton, closePopup } from './modules/popup.js';
import { buttonNext, buttonPrevious, pushSlide, shiftForward } from './modules/slider.js';
import { fillPaginationElements, pageChangeAnimation, renderCards, paginationButtonNext, paginationButtonLast, paginationButtonPrevious, paginationButtonFirst, showNextPage, showLastPage, showPreviousPage, showFirstPage } from './modules/pagination.js';

export const body = document.querySelector('body');

// Burger-menu
document.addEventListener('click', closeMenu);
burgerMenu.forEach(burger => burger.addEventListener('click', toggleMenu));

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
if (body.dataset.page === 'main') {
  pushSlide();
  buttonNext.addEventListener('click', shiftForward);
  buttonPrevious.addEventListener('click', shiftForward);
}

// Pagination
if (body.dataset.page === 'pets=page') {
  fillPaginationElements();
  pageChangeAnimation(renderCards);
  paginationButtonNext.addEventListener('click', showNextPage);
  paginationButtonLast.addEventListener('click', showLastPage);
  paginationButtonPrevious.addEventListener('click', showPreviousPage);
  paginationButtonFirst.addEventListener('click', showFirstPage);

  // Should pagination be able to change in lifetime?
  let resizeId;
  window.addEventListener('resize', function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(showFirstPage, 100);
  });
}

// Disable two last links in navigation menu
// const listItems = document.querySelectorAll('.list__item');
// const listItemsDisabled = [listItems[2], listItems[3]];
// listItemsDisabled.forEach(item => item.addEventListener('click', (e) => {
//   e.preventDefault();
//   e.stopPropagation();
// }))