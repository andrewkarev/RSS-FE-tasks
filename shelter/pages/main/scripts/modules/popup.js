import { body } from './../script.js';
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

  popupContainer.append(modalWindow);

  body.classList.add('body--lock');
  popup.classList.add('popup--show');
  animateModalWindow(modalWindow);
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
}

export function hoverCloseButton(e) {
  const isPopupBlackout = e.target.classList.contains('popup--show');

  if (isPopupBlackout) {
    popupCloseButton.classList.add('popup__close-button--hover');
  } else {
    popupCloseButton.classList.remove('popup__close-button--hover');
  }
}

function animateModalWindow(modalWindow) {
  const POPUP_MAXIMAL_HEIGHT = 552;
  const currentPopupHeight = document.documentElement.clientHeight
  const modalWindowHalfHeight = modalWindow.offsetHeight / 2;
  const popupHeight = currentPopupHeight > POPUP_MAXIMAL_HEIGHT ? currentPopupHeight : POPUP_MAXIMAL_HEIGHT;
  const additionalOffset = (modalWindowHalfHeight * 100) / popupHeight;

  function animate({ timing, draw, duration }) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
      let progress = timing(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }

  animate({
    duration: 400,
    timing: function (timeFraction) {
      return timeFraction;
    },
    draw: function (progress) {
      popupContainer.style.top = `${progress * 50 - additionalOffset}%`;
    }
  });
}