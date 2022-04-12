import { burgerMenu, toggleMenu, closeMenu } from './modules/burger-menu.js';

document.addEventListener('click', closeMenu);
burgerMenu.forEach(burger => burger.addEventListener('click', toggleMenu));