import state from './app-state';
import { getCars, getWinners } from './app-render';
import appElements from './app-elements';

const setToTheStateObject = () => {
  const isPrevActive = !appElements.previousPageButton?.hasAttribute('disabled');
  const isNextActive = !appElements.nextPageButton?.hasAttribute('disabled');

  state.paginationButtonsState.prevIsActive = isPrevActive;
  state.paginationButtonsState.nextIsActive = isNextActive;
};

const handleGaragePaginationButtonClick = async (isForward: boolean) => {
  isForward ? state.currentGaragePage += 1 : state.currentGaragePage -= 1;
  const { cars } = await getCars(state.currentGaragePage);
  if (appElements.carsContainer && cars) appElements.carsContainer.innerHTML = cars?.join('');
};

const handleWinnersPaginationButtonClick = async (isForward: boolean) => {
  isForward ? state.currentWinnersPage += 1 : state.currentWinnersPage -= 1;
  const { winners } = await getWinners(state.currentWinnersPage);
  if (appElements.winnersContainer && winners) appElements.winnersContainer.innerHTML = winners?.join('');
};

const updatePaginationButtonsView = (button: HTMLElement | null, addition: boolean) => {
  if (addition) {
    button?.classList.add('disabled');
    button?.setAttribute('disabled', '');
  } else {
    button?.classList.remove('disabled');
    button?.removeAttribute('disabled');
  }
};

const updatePaginationButtonsState = () => {
  const isGaragePage = state.currentPage === 'garage';
  const elementsAtAll = isGaragePage ? state.carsInGarage : state.winnersAtAll;
  const elementsPerPageLimit = isGaragePage ? state.carsPerPageLimit : state.winnersPerPageLimit;
  const pageNumber = isGaragePage ? state.currentGaragePage : state.currentWinnersPage;
  const lastPage = Math.ceil(elementsAtAll / elementsPerPageLimit);

  if (pageNumber === 1) {
    updatePaginationButtonsView(appElements.previousPageButton, true);
    elementsAtAll <= elementsPerPageLimit
      ? updatePaginationButtonsView(appElements.nextPageButton, true)
      : updatePaginationButtonsView(appElements.nextPageButton, false);
  } else {
    updatePaginationButtonsView(appElements.previousPageButton, false);
    pageNumber < lastPage
      ? updatePaginationButtonsView(appElements.nextPageButton, false)
      : updatePaginationButtonsView(appElements.nextPageButton, true);
  }

  setToTheStateObject();

  if (state.isRace && isGaragePage) {
    updatePaginationButtonsView(appElements.previousPageButton, true);
    updatePaginationButtonsView(appElements.nextPageButton, true);
  }
};

const handlePaginationsButtonClick = () => {
  appElements.previousPageButton?.addEventListener('click', async () => {
    if (state.currentPage === 'garage' && appElements.carsContainer) {
      await handleGaragePaginationButtonClick(false);
      if (appElements.garagePagesCounter) appElements.garagePagesCounter.innerHTML = `${state.currentGaragePage}`;
      updatePaginationButtonsState();
    }

    if (state.currentPage === 'winners') {
      await handleWinnersPaginationButtonClick(false);
      if (appElements.winnersPageCounter) appElements.winnersPageCounter.innerHTML = `${state.currentWinnersPage}`;
      updatePaginationButtonsState();
    }
  });

  appElements.nextPageButton?.addEventListener('click', async () => {
    if (state.currentPage === 'garage' && appElements.carsContainer) {
      await handleGaragePaginationButtonClick(true);
      if (appElements.garagePagesCounter) appElements.garagePagesCounter.innerHTML = `${state.currentGaragePage}`;
      updatePaginationButtonsState();
    }

    if (state.currentPage === 'winners') {
      await handleWinnersPaginationButtonClick(true);
      if (appElements.winnersPageCounter) appElements.winnersPageCounter.innerHTML = `${state.currentWinnersPage}`;
      updatePaginationButtonsState();
    }
  });
};

export {
  handlePaginationsButtonClick,
  updatePaginationButtonsState,
  setToTheStateObject,
};
