import { renderWinningMessage } from './UI';
import state from './app-state';
import appElements from './app-elements';

const getRandomNumber = (
  item: string | string[],
): number => Math.floor(Math.random() * item.length);

const showWinningMessage = (name: string, time: number): HTMLElement => {
  const root = document.getElementById('body');
  const message = renderWinningMessage(name, time);
  root?.append(message);
  return message;
};

export const getRandomColor = (): string => {
  const hexadecimal = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    const randomIndex = getRandomNumber(hexadecimal);
    color += hexadecimal[randomIndex];
  }

  return color;
};

export const getRandomCarName = (): string => {
  const brandOption = state.carsBrands[getRandomNumber(state.carsBrands)];
  const modelOption = state.carsModels[getRandomNumber(state.carsModels)];
  return `${brandOption} ${modelOption}`;
};

export const handleAnimationEnd = (id: number, duration: number) => {
  state.raceWinnerId = id;

  const winnerCar = document.getElementById(`car-name-${id}`);
  const winnerTime = +(duration / 1000).toFixed(2);
  const winnreName = winnerCar?.innerText || '';

  const message = showWinningMessage(winnreName, winnerTime);
  window.addEventListener('click', () => message.remove());
};

export const initAppElements = () => {
  appElements.raceButton = document.getElementById('button-race');
  appElements.resetButton = document.getElementById('button-reset');
  appElements.root = document.getElementById('body');
  appElements.sortByWinsButton = document.getElementById('sort-by-wins');
  appElements.sortByTimeButton = document.getElementById('sort-by-time');
  appElements.createButton = document.getElementById('button-create');
  appElements.createModelInput = document.getElementById('create-model');
  appElements.createColorInput = document.getElementById('create-color');
  appElements.carsCounter = document.getElementById('garage-cars-count');
  appElements.updateButton = document.getElementById('button-update');
  appElements.updateModelInput = document.getElementById('update-model');
  appElements.updateColorInput = document.getElementById('update-color');
  appElements.generateButton = document.getElementById('button-generate');
  appElements.garageButton = document.getElementById('button-garage');
  appElements.winnersButton = document.getElementById('button-winners');
  appElements.garagePage = document.getElementById('garage');
  appElements.winnersPage = document.getElementById('winners');
  appElements.previousPageButton = document.getElementById('button-prev');
  appElements.nextPageButton = document.getElementById('button-next');
  appElements.carsContainer = document.getElementById('cars');
  appElements.garagePagesCounter = document.getElementById('garage-page-count');
  appElements.winnersPageCounter = document.getElementById('winners-page-count');
  appElements.winnersContainer = document.getElementById('winning-cars');
  appElements.winnersTotalCount = document.getElementById('winners-total-count');
};
