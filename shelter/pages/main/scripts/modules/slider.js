import PETS from './our-pets.js';
import { showPopup } from './popup.js';

export const buttonPrevious = document.querySelector('.button-arrow--prev');
export const buttonNext = document.querySelector('.button-arrow--next');
const petsCards = document.querySelector('.pets-cards');
const petsCsrdsNodes = PETS.map(pet => createCardInner.call(pet, 'pets-card--main-page'));
export let cardIndices = [];
let offset = 0;

// Create pets card element
export function createCardInner(additionalClass) {
  return `<div class="pets-card ${additionalClass}" data-id="${this.id}">
    <div class="pets-card__img-wrapper">
      <img class="pets-card__img" src="${this.img}" alt="${this.breed}">
    </div>
    <h4 class="pets-card__title">${this.name}</h4>
    <button class="pets-card__button button">Learn more</button>
  </div>`
}

// Roll random index
export function getRandomIndex() {
  let randomIndex = Math.floor(Math.random() * (petsCsrdsNodes.length));
  if (cardIndices.includes(randomIndex)) {
    randomIndex = getRandomIndex();
  } else {
    cardIndices.push(randomIndex);
  }
  return randomIndex;
}

//
function getCardsContainerWidth() {
  return petsCards.offsetWidth;
}

// Place slide in the pets cards element
export function pushSlide(target = null) {
  const sliderElement = document.createElement('div');
  const containerWidth = getCardsContainerWidth();

  const cardsGap = containerWidth === 990 ? 90 : containerWidth === 580 ? 40 : 0;
  sliderElement.classList.add('pets-cards__slide');

  if (target) {
    sliderElement.style.left = -(offset * containerWidth + cardsGap) + 'px';
  } else {
    sliderElement.style.left = !cardIndices.length ? offset * containerWidth + 'px' : offset * containerWidth + cardsGap + 'px';
  }

  const cardsCount = 3;
  for (let i = 0; i < cardsCount; i++) {
    let index = getRandomIndex();
    sliderElement.innerHTML += petsCsrdsNodes[index];
  }

  if (target) {
    petsCards.prepend(sliderElement);
  } else {
    petsCards.appendChild(sliderElement);
  }

  offset = 1;

  // Show popup on pets card button click
  addPopupHandler(petsCards)
}

export function addPopupHandler(cardsContainer) {
  const allPetsCards = cardsContainer.querySelectorAll('.pets-card');
  allPetsCards.forEach(card => card.addEventListener('click', (e) => {
    const id = Number(e.currentTarget.dataset.id);
    showPopup(id);
  }));
}

// Replace first slide with second
export function shiftForward(e) {
  const eventTarget = e.target;
  petsCards.style.overflow = 'hidden';

  if (eventTarget === buttonPrevious) {
    pushSlide();
  } else {
    pushSlide(eventTarget);
  }

  cardIndices = cardIndices.slice(3);

  buttonNext.removeEventListener('click', shiftForward);
  buttonPrevious.removeEventListener('click', shiftForward);
  const sliderElementsCount = document.querySelectorAll('.pets-cards__slide');
  const containerWidth = getCardsContainerWidth();
  const cardsGap = containerWidth === 990 ? 90 : containerWidth === 580 ? 40 : 0;
  let offset2;

  if (eventTarget === buttonPrevious) {
    offset2 = 0;
    for (let i = 0; i < sliderElementsCount.length; i++) {
      i === 0 ? sliderElementsCount[i].style.left = offset2 * containerWidth - cardsGap - containerWidth + 'px' :
        sliderElementsCount[i].style.left = offset2 * containerWidth - containerWidth + 'px';
      offset2++;
    }
  } else {
    offset2 = 1;
    for (let i = sliderElementsCount.length - 1; i >= 0; i--) {
      i === sliderElementsCount.length - 1 ? sliderElementsCount[i].style.left = offset2 * containerWidth + cardsGap + 'px' :
        sliderElementsCount[i].style.left = offset2 * containerWidth + 'px';
      offset2--;
    }
  }

  setTimeout(() => {
    buttonNext.addEventListener('click', shiftForward);
    buttonPrevious.addEventListener('click', shiftForward);
    petsCards.style.overflow = 'initial';
    eventTarget === buttonPrevious ? sliderElementsCount[0].remove() : sliderElementsCount[1].remove();
  }, 1300)
}