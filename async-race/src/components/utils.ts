import { renderWinningMessage } from './UI';

const showWinningMessage = () => {
  const root = document.getElementById('body');
  const message = renderWinningMessage('BMW', 2.2);
  root?.append(message);
};

export default showWinningMessage;
