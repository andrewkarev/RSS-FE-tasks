import { getWinner, updateWinner, createwinner } from './api';
import { getWinners } from './app-render';
import state from './app-state';
import { updatePaginationButtonsState } from './pagination';

let winnersContainer: HTMLElement | null;
let sortByWinsButton: HTMLElement | null;
let sortByTimeButton: HTMLElement | null;

const initWwinnersItems = () => {
  winnersContainer = document.getElementById('winning-cars');
  sortByWinsButton = document.getElementById('sort-by-wins');
  sortByTimeButton = document.getElementById('sort-by-time');
};

const updateWinnersView = async () => {
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

const handleWinnersButtonClick = () => {
  sortByWinsButton?.addEventListener('click', async () => {
    state.sortBy = 'wins';

    state.winsOrder = state.winsOrder === 'ASC' ? 'DESC' : 'ASC';
    state.order = state.winsOrder;
    await updateWinnersView();
  });

  sortByTimeButton?.addEventListener('click', async () => {
    state.sortBy = 'time';

    state.timeOrder = state.timeOrder === 'ASC' ? 'DESC' : 'ASC';
    state.order = state.timeOrder;
    await updateWinnersView();
  });
};

export { handleRaceResults, initWwinnersItems, handleWinnersButtonClick };
