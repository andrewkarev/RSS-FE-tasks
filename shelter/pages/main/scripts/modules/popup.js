import { body, headerPetsPage } from './burger-menu.js';
export const petsCard = document.querySelectorAll('.pets-card');
export const popup = document.querySelector('.popup');
export const popupCloseButton = document.querySelector('.popup__close-button');
const popupContainer = document.querySelector('.popup__container');
// const body = document.querySelector('body');

export function showPopup() {
  body.classList.add('body--lock');
  popup.classList.add('popup--show');
  popupContainer.classList.add('popup__container--show');
  checkPage()
}

export function closePopup() {
  body.classList.remove('body--lock');
  popup.classList.remove('popup--show');
  popupContainer.classList.remove('popup__container--show');
  checkPage()
}

export function hoverCloseButton(e) {
  const isPopupBlackout = e.target.classList.contains('popup--show');

  if (isPopupBlackout) {
    popupCloseButton.classList.add('popup__close-button--hover');
  } else {
    popupCloseButton.classList.remove('popup__close-button--hover');
  }
}

function checkPage() {
  if (headerPetsPage) {
    headerPetsPage.classList.toggle('header--pets-lock');
  }
}