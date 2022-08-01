import { renderWinningMessage } from './UI';

export const showWinningMessage = () => {
  const root = document.getElementById('body');
  const message = renderWinningMessage('BMW', 2.2);
  root?.append(message);
};

export const getRandomColor = (): string => {
  const hexadecimal = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i += 1) {
    const randomIndex = Math.floor(Math.random() * hexadecimal.length);
    color += hexadecimal[randomIndex];
  }

  return color;
};
