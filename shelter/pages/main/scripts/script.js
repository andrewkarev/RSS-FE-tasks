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

// Slider
const buttonPrevious = document.querySelector('.button-arrow--prev');
const buttonNext = document.querySelector('.button-arrow--next');
const petsCards = document.querySelector('.pets-cards');
const petsCsrdsNodes = PETS.map(pet => createCardNode.call(pet));
let cardIndices = [];
let offset = 0;

function createCardNode() {
  return `<div class="pets-card pets-card--main-page">
    <div class="pets-card__img-wrapper">
      <img class="pets-card__img" src="${this.img}" alt="${this.breed}">
    </div>
    <h4 class="pets-card__title">${this.name}</h4>
    <button class="pets-card__button button">Learn more</button>
  </div>`
}

function getRandomIndex() {
  let randomIndex = Math.floor(Math.random() * (petsCsrdsNodes.length));
  if (cardIndices.includes(randomIndex)) {
    randomIndex = getRandomIndex();
  } else {
    cardIndices.push(randomIndex);
  }
  return randomIndex;
}

function getCardsContainerWidth() {
  return petsCards.offsetWidth;
}

function pushSlide(target = null) {
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
}

function shiftForward(e) {
  const eventTarget = e.target;

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
    eventTarget === buttonPrevious ? sliderElementsCount[0].remove() : sliderElementsCount[1].remove();
  }, 1300)
}

pushSlide();
buttonNext.addEventListener('click', shiftForward);
buttonPrevious.addEventListener('click', shiftForward);
