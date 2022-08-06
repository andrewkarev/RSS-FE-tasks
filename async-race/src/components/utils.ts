import { renderWinningMessage } from './UI';
import state from './app-state';

const getRandomNumber = (
  item: string | string[],
): number => Math.floor(Math.random() * item.length);

export const showWinningMessage = (name: string, time: number): void => {
  const root = document.getElementById('body');
  const message = renderWinningMessage(name, time);
  root?.append(message);
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
