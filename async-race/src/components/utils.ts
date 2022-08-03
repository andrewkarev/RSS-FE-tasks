import { renderWinningMessage } from './UI';

const getRandomNumber = (
  item: string | string[],
): number => Math.floor(Math.random() * item.length);

export const showWinningMessage = (): void => {
  const root = document.getElementById('body');
  const message = renderWinningMessage('BMW', 2.2);
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
