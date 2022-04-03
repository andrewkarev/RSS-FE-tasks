// Burger menu
const body = document.querySelector('body');
const burgerMenu = document.querySelector('.burger-menu');
const header = document.querySelector('.header');
const headerContainer = document.querySelector('.header__container');
const navigation = document.querySelector('.navigation');

burgerMenu.addEventListener('click', () => {
  body.classList.toggle('body--lock');
  burgerMenu.classList.toggle('burger-menu--open');
  header.classList.toggle('header--mobile');
  headerContainer.classList.toggle('header__container--mobile');
  navigation.classList.toggle('navigation--show');
})

document.addEventListener('click', (e) => {
  const isHeaderElement = e.target.classList.contains('header--mobile');
  const isNavigationItem = e.target.classList.contains('list__link');

  if (isHeaderElement || isNavigationItem) {
    body.classList.remove('body--lock');
    burgerMenu.classList.remove('burger-menu--open');
    header.classList.remove('header--mobile');
    headerContainer.classList.remove('header__container--mobile');
    navigation.classList.remove('navigation--show');
  }
})