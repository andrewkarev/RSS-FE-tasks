// Burger menu
const body = document.querySelector('body');
const burgerMenu = document.querySelector('.burger-menu');
const headerContainer = document.querySelector('.header__container');
const headerPetsPage = document.querySelector('.header--pets');
const navigation = document.querySelector('.navigation');
const background = document.querySelector('.background');

burgerMenu.addEventListener('click', () => {
  body.classList.toggle('body--lock');
  burgerMenu.classList.toggle('burger-menu--open');
  headerContainer.classList.toggle('header__container--mobile');
  navigation.classList.toggle('navigation--show');
  background.classList.toggle('background--blured');
  headerPetsPage.classList.toggle('header--pets-mobile');
})

document.addEventListener('click', (e) => {
  const isBackgroundElement = e.target.classList.contains('background--blured');
  const isNavigationItem = e.target.classList.contains('list__link');

  if (isBackgroundElement || isNavigationItem) {
    body.classList.remove('body--lock');
    burgerMenu.classList.remove('burger-menu--open');
    headerContainer.classList.remove('header__container--mobile');
    navigation.classList.remove('navigation--show');
    background.classList.remove('background--blured');
    headerPetsPage.classList.remove('header--pets-mobile');
  }
})