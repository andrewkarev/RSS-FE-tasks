import { burgerMenu, toggleMenu, closeMenu } from './modules/burger-menu.js';
import { popupCloseButton, popup, hoverCloseButton, closePopup } from './modules/popup.js';
import { buttonNext, buttonPrevious, pushSlide, shiftForward } from './modules/slider.js';
import PETS from './modules/our-pets.js';

export const body = document.querySelector('body');

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
if (body.dataset.page === 'main') {
  pushSlide();
  buttonNext.addEventListener('click', shiftForward);
  buttonPrevious.addEventListener('click', shiftForward);
}

// Pagination
import { getRandomIndex, cardIndices, createCardInner } from './modules/slider.js';

const petsCardsOurFriends = document.querySelector('.pets-cards--our-friends');
const paginationButtonFirst = document.querySelector('.button-arrow--first-page');
const paginationButtonLast = document.querySelector('.button-arrow--last-page');
const paginationButtonNext = document.querySelector('.button-arrow--next-page');
const paginationButtonPrevious = document.querySelector('.button-arrow--previous-page');
const paginationPagePointer = document.querySelector('.page-pointer__inner');
const paginationElements = [];
const step = 8;
const paginationElementsCounter = 48;
const pagesAtAll = paginationElementsCounter / step;
let elementsOnPage = 0;

// Create initial pets page pagination elements list
function fillPaginationElements() {
  for (let i = 0; i < paginationElementsCounter; i++) {
    if (cardIndices.length === step) {
      cardIndices.length = 0;
    }

    let index = getRandomIndex();
    paginationElements.push(PETS[index]);
  }
}

function renderCards() {
  petsCardsOurFriends.innerHTML = '';
  for (let i = elementsOnPage; i < elementsOnPage + step; i++) {
    const card = createCardInner.call(paginationElements[i], 'pets-card--our-friends');
    petsCardsOurFriends.innerHTML += card;
  }
}

function showNextPage() {
  elementsOnPage += 8;
  if (elementsOnPage === paginationElements.length - 8) {
    paginationButtonFirst.classList.remove('button-arrow--disabled');
    paginationButtonPrevious.classList.remove('button-arrow--disabled');
    paginationButtonLast.classList.add('button-arrow--disabled');
    paginationButtonNext.classList.add('button-arrow--disabled');
    // paginationButtonLast.removeEventListener('click', showLastPage);
    // paginationButtonNext.removeEventListener('click', showNextPage);
  }

  renderCards();

  const currentPage = +paginationPagePointer.innerHTML + 1
  paginationPagePointer.innerHTML = `${currentPage}`;
}


function showLastPage() {
  elementsOnPage = 40;
  if (elementsOnPage === paginationElements.length - 8) {
    paginationButtonFirst.classList.remove('button-arrow--disabled');
    paginationButtonPrevious.classList.remove('button-arrow--disabled');
    paginationButtonLast.classList.add('button-arrow--disabled');
    paginationButtonNext.classList.add('button-arrow--disabled');
    // paginationButtonLast.removeEventListener('click', showLastPage);
    // paginationButtonNext.removeEventListener('click', showNextPage);
  }

  renderCards();

  paginationPagePointer.innerHTML = `${pagesAtAll}`;
}

function showPreviousPage() {
  elementsOnPage -= 8;
  if (elementsOnPage === 0) {
    paginationButtonLast.classList.remove('button-arrow--disabled');
    paginationButtonNext.classList.remove('button-arrow--disabled');
    paginationButtonFirst.classList.add('button-arrow--disabled');
    paginationButtonPrevious.classList.add('button-arrow--disabled');
    // paginationButtonPrevious.removeEventListener('click', showPreviousPage);
    // paginationButtonFirst.removeEventListener('click', );
  }

  renderCards();

  const currentPage = +paginationPagePointer.innerHTML - 1
  paginationPagePointer.innerHTML = `${currentPage}`;
}


function showFirstPage() {
  elementsOnPage = 0;
  if (elementsOnPage === 0) {
    paginationButtonLast.classList.remove('button-arrow--disabled');
    paginationButtonNext.classList.remove('button-arrow--disabled');
    paginationButtonFirst.classList.add('button-arrow--disabled');
    paginationButtonPrevious.classList.add('button-arrow--disabled');
    // paginationButtonPrevious.removeEventListener('click', showPreviousPage);
    // paginationButtonFirst.removeEventListener('click', showFirstPage);
  }

  renderCards();

  paginationPagePointer.innerHTML = '1';
}


fillPaginationElements()
renderCards()
paginationButtonNext.addEventListener('click', showNextPage);
paginationButtonLast.addEventListener('click', showLastPage);
paginationButtonPrevious.addEventListener('click', showPreviousPage);
paginationButtonFirst.addEventListener('click', showFirstPage);