import { getWinner, updateWinner, createwinner } from './api';
import { getWinners } from './app-render';
import state from './app-state';
import { updatePaginationButtonsState } from './pagination';

const updateWinnersView = async () => {
  const winnersContainer = document.getElementById('winning-cars');
  const { winners, count: winnersCount } = await getWinners(state.currentWinnersPage);

  state.winnersAtAll = winnersCount || 0;

  if (winnersContainer && winners) winnersContainer.innerHTML = winners?.join('');

  updatePaginationButtonsState();
};

const handleRaceResults = async (id: number, duration: number) => {
  const response = await getWinner(id);
  const currentTime = +(duration / 1000).toFixed(2);

  if (response) {
    const body = {
      wins: response.wins += 1,
      time: Math.min(response.time, currentTime),
    };

    await updateWinner(id, body);
  } else {
    const body = {
      wins: 1,
      time: currentTime,
      id,
    };

    await createwinner(body);
  }

  await updateWinnersView();
};

export { handleRaceResults, updateWinnersView };
