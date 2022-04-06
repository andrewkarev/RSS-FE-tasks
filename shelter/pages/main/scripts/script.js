import { burgerMenu, toggleMenu, closeMenu } from './modules/burger-menu.js';
import PETS from './modules/our-pets.js';

document.addEventListener('click', closeMenu);
burgerMenu.addEventListener('click', toggleMenu);