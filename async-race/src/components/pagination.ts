import state from './app-state';
import { getCars, getWinners } from './app-render';
import appElements from './app-elements';
import { setAppropriateButtonStats } from './utils';

const setToTheStateObject = (): void => {
  const isPrevActive = !appElements.previousPageButton?.hasAttribute('disabled');
  const isNextActive = !appElements.nextPageButton?.hasAttribute('disabled');

  state.paginationButtonsState.prevIsActive = isPrevActive;
  state.paginationButtonsState.nextIsActive = isNextActive;
};

const handleGaragePaginationButtonClick = async (isForward: boolean): Promise<void> => {
  isForward ? state.currentGaragePage += 1 : state.currentGaragePage -= 1;
  const { cars } = await getCars(state.currentGaragePage);

  if (appElements.carsContainer && cars) {
    appElements.carsContainer.innerHTML = cars?.join('');
  }
};

const handleWinnersPaginationButtonClick = async (isForward: boolean): Promise<void> => {
  isForward ? state.currentWinnersPage += 1 : state.currentWinnersPage -= 1;
  const { winners } = await getWinners(state.currentWinnersPage);
  if (appElements.winnersContainer && winners) {
    appElements.winnersContainer.innerHTML = winners?.join('');
  }
};

const updatePaginationButtonsState = (): void => {
  const isGaragePage = state.currentPage === 'garage';
  const elementsAtAll = isGaragePage ? state.carsInGarage : state.winnersAtAll;
  const elementsPerPageLimit = isGaragePage ? state.carsPerPageLimit : state.winnersPerPageLimit;
  const pageNumber = isGaragePage ? state.currentGaragePage : state.currentWinnersPage;
  const lastPage = Math.ceil(elementsAtAll / elementsPerPageLimit);

  if (pageNumber === 1) {
    setAppropriateButtonStats(appElements.previousPageButton, true);
    elementsAtAll <= elementsPerPageLimit
      ? setAppropriateButtonStats(appElements.nextPageButton, true)
      : setAppropriateButtonStats(appElements.nextPageButton, false);
  } else {
    setAppropriateButtonStats(appElements.previousPageButton, false);
    pageNumber < lastPage
      ? setAppropriateButtonStats(appElements.nextPageButton, false)
      : setAppropriateButtonStats(appElements.nextPageButton, true);
  }

  setToTheStateObject();

  if (state.isRace && isGaragePage) {
    setAppropriateButtonStats(appElements.previousPageButton, true);
    setAppropriateButtonStats(appElements.nextPageButton, true);
  }
};

const handlePaginationsButtonClick = async (isPrev: boolean): Promise<void> => {
  if (state.currentPage === 'garage' && appElements.carsContainer) {
    await handleGaragePaginationButtonClick(isPrev);
    if (appElements.garagePagesCounter) {
      appElements.garagePagesCounter.innerHTML = `${state.currentGaragePage}`;
    }
  }

  if (state.currentPage === 'winners') {
    await handleWinnersPaginationButtonClick(isPrev);
    if (appElements.winnersPageCounter) {
      appElements.winnersPageCounter.innerHTML = `${state.currentWinnersPage}`;
    }
  }

  updatePaginationButtonsState();
};

const addListenersOnPaginationButtons = (): void => {
  appElements.previousPageButton?.addEventListener('click', async () => {
    await handlePaginationsButtonClick(false);
  });

  appElements.nextPageButton?.addEventListener('click', async () => {
    await handlePaginationsButtonClick(true);
  });
};

export {
  addListenersOnPaginationButtons,
  updatePaginationButtonsState,
  setToTheStateObject,
};
