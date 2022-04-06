import { burgerMenu, toggleMenu, closeMenu } from './modules/burger-menu.js';

document.addEventListener('click', closeMenu);
burgerMenu.addEventListener('click', toggleMenu);