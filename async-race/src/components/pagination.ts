import state from './app-state';
import { getCars, getWinners } from './app-render';

let previousPageButton: HTMLElement | null;
let nextPageButton: HTMLElement | null;
let carsContainer: HTMLElement | null;
let garagePagesCounter: HTMLElement | null;
let winnersContainer: HTMLElement | null;
let winnersPageCounter: HTMLElement | null;

const getPaginationElements = () => {
  previousPageButton = document.getElementById('button-prev');
  nextPageButton = document.getElementById('button-next');
  carsContainer = document.getElementById('cars');
  garagePagesCounter = document.getElementById('garage-page-count');
  winnersPageCounter = document.getElementById('winners-page-count');
  winnersContainer = document.getElementById('winning-cars');
};

const handleGaragePaginationButtonClick = async (isForward: boolean) => {
  isForward ? state.currentGaragePage += 1 : state.currentGaragePage -= 1;
  const { cars } = await getCars(state.currentGaragePage);
  if (carsContainer && cars) carsContainer.innerHTML = cars?.join('');
};

const handleWinnersPaginationButtonClick = async (isForward: boolean) => {
  isForward ? state.currentWinnersPage += 1 : state.currentWinnersPage -= 1;
  const { winners } = await getWinners(state.currentWinnersPage);
  if (winnersContainer && winners) winnersContainer.innerHTML = winners?.join('');
};

const updatePaginationButtonsState = () => {
  const isGaragePage = state.currentPage === 'garage';
  const elementsAtAll = isGaragePage ? state.carsInGarage : state.winnersAtAll;
  const elementsPerPageLimit = isGaragePage ? state.carsPerPageLimit : state.winnersPerPageLimit;
  const pageNumber = isGaragePage ? state.currentGaragePage : state.currentWinnersPage;
  const lastPage = Math.ceil(elementsAtAll / elementsPerPageLimit);

  if (pageNumber === 1 && elementsAtAll <= elementsPerPageLimit) {
    previousPageButton?.classList.add('disabled');
    previousPageButton?.setAttribute('disabled', '');
    nextPageButton?.classList.add('disabled');
    nextPageButton?.setAttribute('disabled', '');
  }

  if (pageNumber === 1 && elementsAtAll > elementsPerPageLimit) {
    previousPageButton?.classList.add('disabled');
    previousPageButton?.setAttribute('disabled', '');
    nextPageButton?.classList.remove('disabled');
    nextPageButton?.removeAttribute('disabled');
  }

  if (pageNumber !== 1 && pageNumber < lastPage) {
    previousPageButton?.classList.remove('disabled');
    previousPageButton?.removeAttribute('disabled');
    nextPageButton?.classList.remove('disabled');
    nextPageButton?.removeAttribute('disabled');
  }

  if (pageNumber !== 1 && pageNumber === lastPage) {
    previousPageButton?.classList.remove('disabled');
    previousPageButton?.removeAttribute('disabled');
    nextPageButton?.classList.add('disabled');
    nextPageButton?.setAttribute('disabled', '');
  }
};

const handlePaginationsButtonClick = () => {
  getPaginationElements();

  previousPageButton?.addEventListener('click', async () => {
    if (state.currentPage === 'garage' && carsContainer) {
      await handleGaragePaginationButtonClick(false);
      if (garagePagesCounter) garagePagesCounter.innerHTML = `${state.currentGaragePage}`;
      updatePaginationButtonsState();
    }

    if (state.currentPage === 'winners') {
      await handleWinnersPaginationButtonClick(false);
      if (winnersPageCounter) winnersPageCounter.innerHTML = `${state.currentWinnersPage}`;
      updatePaginationButtonsState();
    }
  });

  nextPageButton?.addEventListener('click', async () => {
    if (state.currentPage === 'garage' && carsContainer) {
      await handleGaragePaginationButtonClick(true);
      if (garagePagesCounter) garagePagesCounter.innerHTML = `${state.currentGaragePage}`;
      updatePaginationButtonsState();
    }

    if (state.currentPage === 'winners') {
      await handleWinnersPaginationButtonClick(true);
      if (winnersPageCounter) winnersPageCounter.innerHTML = `${state.currentWinnersPage}`;
      updatePaginationButtonsState();
    }
  });
};

export { handlePaginationsButtonClick, updatePaginationButtonsState };
