import state from './app-state';
import { updatePaginationButtonsState } from './pagination';
import appElements from './app-elements';

const changePage = (): void => {
  appElements.garageButton?.addEventListener('click', () => {
    if (appElements.garagePage) appElements.garagePage.style.display = 'block';
    if (appElements.winnersPage) appElements.winnersPage.style.display = 'none';
    appElements.garageButton?.classList.add('active');
    appElements.winnersButton?.classList.remove('active');
    state.currentPage = 'garage';
    updatePaginationButtonsState();
  });

  appElements.winnersButton?.addEventListener('click', () => {
    if (appElements.winnersPage) appElements.winnersPage.style.display = 'block';
    if (appElements.garagePage) appElements.garagePage.style.display = 'none';
    appElements.winnersButton?.classList.add('active');
    appElements.garageButton?.classList.remove('active');
    state.currentPage = 'winners';
    updatePaginationButtonsState();
  });
};

export default changePage;
