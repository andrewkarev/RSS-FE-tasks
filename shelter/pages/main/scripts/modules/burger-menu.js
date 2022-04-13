import { body } from './../script.js';

export const burgerMenu = document.querySelectorAll('.burger-menu');
export const headerPetsPage = document.querySelector('.header--pets');
const navigation = document.querySelector('.navigation');
const background = document.querySelector('.background');

export function toggleMenu() {
  body.classList.toggle('body--lock');
  burgerMenu.forEach(burger => burger.classList.toggle('burger-menu--open'));
  navigation.classList.toggle('navigation--show');
  background.classList.toggle('background--blured');
  checkPage();
}

export function closeMenu(e) {
  const isBackgroundElement = e.target.classList.contains('background--blured');
  const isNavigationItem = e.target.classList.contains('list__link');

  if (isBackgroundElement || isNavigationItem) {
    body.classList.remove('body--lock');
    burgerMenu.forEach(burger => burger.classList.remove('burger-menu--open'));
    navigation.classList.remove('navigation--show');
    background.classList.remove('background--blured');
    checkPage();
  }
}

function checkPage() {
  if (headerPetsPage) {
    headerPetsPage.classList.toggle('header--pets-mobile');
  }
}