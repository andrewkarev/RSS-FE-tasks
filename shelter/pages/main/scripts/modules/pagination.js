import { getRandomIndex, cardIndices, createCardInner, addPopupHandler } from './slider.js';
import PETS from './our-pets.js';

const petsCardsOurFriends = document.querySelector('.pets-cards--our-friends');
export const paginationButtonFirst = document.querySelector('.button-arrow--first-page');
export const paginationButtonLast = document.querySelector('.button-arrow--last-page');
export const paginationButtonNext = document.querySelector('.button-arrow--next-page');
export const paginationButtonPrevious = document.querySelector('.button-arrow--previous-page');
const paginationPagePointer = document.querySelector('.page-pointer__inner');
const paginationElements = [];
let step = 8;
const paginationElementsCounter = 48;
let pagesAtAll;
let elementsOnPage = 0;
let isNextButtonsActive = true;
let isPreviousButtonsActive = true;

// Calculate current step
function getStep() {
  const getScreebWidth = document.documentElement.clientWidth;
  return getScreebWidth < 768 ? 3 : getScreebWidth <= 1280 ? 6 : 8;
}

// Create initial pets page pagination elements list
export function fillPaginationElements() {
  step = getStep();
  for (let i = 0; i < paginationElementsCounter; i++) {
    if (cardIndices.length === step) {
      cardIndices.length = 0;
    }

    let index = getRandomIndex();
    paginationElements.push(PETS[index]);
  }
}

// Draw pets cards
export function renderCards() {
  step = getStep();
  pagesAtAll = paginationElementsCounter / step;

  petsCardsOurFriends.innerHTML = '';
  for (let i = elementsOnPage; i < elementsOnPage + step; i++) {
    const card = createCardInner.call(paginationElements[i], 'pets-card--our-friends');
    petsCardsOurFriends.innerHTML += card;
  }

  addPopupHandler(petsCardsOurFriends);
}

export function showNextPage() {
  elementsOnPage += step;

  const currentPage = +paginationPagePointer.innerHTML + 1;
  paginationPagePointer.innerHTML = `${currentPage}`;

  pageChangeAnimation(renderCards);
  changePaginationButtonsState(true);
}

export function showLastPage() {
  elementsOnPage = paginationElementsCounter - step;

  paginationPagePointer.innerHTML = `${pagesAtAll}`;

  pageChangeAnimation(renderCards);
  changePaginationButtonsState(true);
}

export function showPreviousPage() {
  elementsOnPage -= step;

  const currentPage = +paginationPagePointer.innerHTML - 1;
  paginationPagePointer.innerHTML = `${currentPage}`;

  pageChangeAnimation(renderCards);
  changePaginationButtonsState();
}

export function showFirstPage() {
  elementsOnPage = 0;

  paginationPagePointer.innerHTML = '1';

  pageChangeAnimation(renderCards);
  changePaginationButtonsState();
}

// Change buttons style and handler status
function changePaginationButtonsState(arg) {
  if (arg) {
    if (elementsOnPage === paginationElementsCounter - step) {
      isNextButtonsActive = false;
      paginationButtonLast.classList.add('button-arrow--disabled');
      paginationButtonNext.classList.add('button-arrow--disabled');
      paginationButtonLast.removeEventListener('click', showLastPage);
      paginationButtonNext.removeEventListener('click', showNextPage);
      checkPaginationButtonsHandlers(arg);
    } else {
      checkPaginationButtonsHandlers(arg);
    }
  } else {
    if (elementsOnPage === 0) {
      isPreviousButtonsActive = false;
      paginationButtonFirst.classList.add('button-arrow--disabled');
      paginationButtonPrevious.classList.add('button-arrow--disabled');
      paginationButtonFirst.removeEventListener('click', showFirstPage);
      paginationButtonPrevious.removeEventListener('click', showPreviousPage);
      checkPaginationButtonsHandlers();
    } else {
      checkPaginationButtonsHandlers();
    }
  }
}

// Helper for a function changePaginationButtonsState
function checkPaginationButtonsHandlers(arg) {
  if (arg) {
    if (!isPreviousButtonsActive) {
      isPreviousButtonsActive = true;
      paginationButtonPrevious.addEventListener('click', showPreviousPage);
      paginationButtonFirst.addEventListener('click', showFirstPage);
    }
    paginationButtonFirst.classList.remove('button-arrow--disabled');
    paginationButtonPrevious.classList.remove('button-arrow--disabled');
  } else {
    if (!isNextButtonsActive) {
      isNextButtonsActive = true;
      paginationButtonNext.addEventListener('click', showNextPage);
      paginationButtonLast.addEventListener('click', showLastPage);
    }
    paginationButtonNext.classList.remove('button-arrow--disabled');
    paginationButtonLast.classList.remove('button-arrow--disabled');
  }
}

// Fade-out effect for pagination pages change
export function pageChangeAnimation(callback) {
  petsCardsOurFriends.style.opacity = 0;
  petsCardsOurFriends.addEventListener('transitionend', showAnimation);

  function showAnimation() {
    petsCardsOurFriends.removeEventListener('transitionend', showAnimation);
    callback();
    petsCardsOurFriends.style.opacity = 1;
  }
}