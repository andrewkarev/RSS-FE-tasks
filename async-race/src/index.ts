import './style.scss';
import changePage from './components/pages-controls';
import { renderApp } from './components/app-render';
import {
  addListenersOnPaginationButtons,
  updatePaginationButtonsState,
  setToTheStateObject,
} from './components/pagination';
import { createCar, handleUpdateButtonClick, handleGenerateButtonClick } from './components/car-manager';
import { handleEngineButtonsClick } from './components/engine-controls';
import { handleRaceButtonClick, handleResetButtonClick } from './components/race-controls';
import { handleWinnersButtonClick } from './components/winners-table';
import { initAppElements } from './components/utils';

const initApp = async () => {
  await renderApp(1);
  initAppElements();
  changePage();
  createCar();
  setToTheStateObject();
  handleUpdateButtonClick();
  handleGenerateButtonClick();
  addListenersOnPaginationButtons();
  updatePaginationButtonsState();
  handleEngineButtonsClick();
  handleRaceButtonClick();
  handleResetButtonClick();
  handleWinnersButtonClick();
};

void initApp();
