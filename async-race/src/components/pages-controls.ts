import state from './app-state';
import { updatePaginationButtonsState } from './pagination';

const changePage = (): void => {
  const garageButton = document.getElementById('button-garage');
  const winnersButton = document.getElementById('button-winners');
  const garagePage = document.getElementById('garage');
  const winnersPage = document.getElementById('winners');

  garageButton?.addEventListener('click', () => {
    if (garagePage) garagePage.style.display = 'block';
    if (winnersPage) winnersPage.style.display = 'none';
    garageButton.classList.add('active');
    winnersButton?.classList.remove('active');
    state.currentPage = 'garage';
    updatePaginationButtonsState();
  });

  winnersButton?.addEventListener('click', () => {
    if (winnersPage) winnersPage.style.display = 'block';
    if (garagePage) garagePage.style.display = 'none';
    winnersButton.classList.add('active');
    garageButton?.classList.remove('active');
    state.currentPage = 'winners';
    updatePaginationButtonsState();
  });
};

export default changePage;
