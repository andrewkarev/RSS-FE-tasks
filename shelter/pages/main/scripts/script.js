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

let offset = 0;

function pushSlide() {
  const sliderElement = document.createElement('div');
  const containerWidth = petsCards.offsetWidth

  sliderElement.classList.add('pets-cards__slide');
  sliderElement.style.left = offset * containerWidth + 'px';

  // const cardsCount = containerWidth === 990 ? 3 : containerWidth === 580 ? 2 : 1;
  for (let i = 0; i < 3; i++) {
    let index = getRandomIndex();
    sliderElement.innerHTML += petsCsrdsNodes[index];
  }

  petsCards.appendChild(sliderElement);
  offset = 1;
}

function shiftForward() {
  const sliderElementsCount = document.querySelectorAll('.pets-cards__slide');
  const containerWidth = petsCards.offsetWidth
  let offset2 = 0;

  for (let i = 0; i < sliderElementsCount.length; i++) {
    sliderElementsCount[i].style.left = offset2 * containerWidth - containerWidth + 'px';
    offset2++;
  }

  setTimeout(() => {
    cardIndices = cardIndices.slice(3);
    sliderElementsCount[0].remove();
    pushSlide();
  }, 2000)

}

pushSlide()
pushSlide()

buttonNext.addEventListener('click', shiftForward);