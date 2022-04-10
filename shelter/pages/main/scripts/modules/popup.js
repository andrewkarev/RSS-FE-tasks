import { body, headerPetsPage } from './burger-menu.js';
import PETS from './our-pets.js';

export const popup = document.querySelector('.popup');
export const popupCloseButton = document.querySelector('.popup__close-button');
const popupContainer = document.querySelector('.popup__container');

export function showPopup(petId) {
  const petInfo = PETS[petId];
  const popupInner = createPopupInner.call(petInfo);

  const modalWindow = document.createElement('div');
  modalWindow.classList.add('popup__modal-window');
  modalWindow.innerHTML = popupInner;

  popupContainer.appendChild(modalWindow);

  body.classList.add('body--lock');
  popup.classList.add('popup--show');
  popupContainer.classList.add('popup__container--show');
  checkPage();
}

function createPopupInner() {
  return `
    <div class="popup__img-wrapper">
      <img class="popup__img" src="${this.img}" alt="${this.type} - ${this.breed}">
    </div>
    <div class="popup__content">
      <h3 class="popup__title">${this.name}</h3>
      <h4 class="popup__subtitle">${this.type} - ${this.breed}</h4>
      <p class="popup__description">${this.description}</p>
      <ul class="popup__list">
        <li class="popup__list-item"><span class="popup__list-annotation">Age: </span>${this.age}</li>
        <li class="popup__list-item"><span class="popup__list-annotation">Inoculations: </span>${this.inoculations.join(', ')}</li>
        <li class="popup__list-item"><span class="popup__list-annotation">Diseases: </span>${this.diseases.join(', ')}</li>
        <li class="popup__list-item"><span class="popup__list-annotation">Parasites: </span>${this.parasites.join(', ')}</li>
      </ul>
    </div>
  `
}

export function closePopup() {
  const modalWindow = popupContainer.querySelector('.popup__modal-window');
  popupContainer.removeChild(modalWindow);

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