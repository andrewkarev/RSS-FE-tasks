import {
  createCar as createCarAPI,
  updateCar as updateCarAPI,
  deleteCar as deleteCarAPI,
  deleteWinner as deleteWinnerAPI,
  getWinners as getWinnersAPI,
} from './api';
import {
  getRandomColor,
  getRandomCarName,
  disableElement,
  activateElement,
} from './utils';
import { renderTrackCar, getCarImage } from './UI';
import { getCars, getWinners } from './app-render';
import state from './app-state';
import { updatePaginationButtonsState } from './pagination';
import appElements from './app-elements';

const getCarAttributes = async (name: string, color: string): Promise<{
  carName: string | undefined;
  carColor: string | undefined;
  id: number | undefined;
}> => {
  const response = await createCarAPI({ name, color });
  const carName = response?.name;
  const carColor = response?.color;
  const id = response?.id;
  return {
    carName,
    carColor,
    id,
  };
};

const updateButtonView = (input: HTMLElement, button: HTMLElement): void => {
  if (!(input instanceof HTMLInputElement)) return;
  if (!input.value) disableElement(button);
  if (input.value) activateElement(button);
};

const updateButtonState = (input: HTMLElement, button: HTMLElement): void => {
  input.addEventListener('focus', () => updateButtonView(input, button));
  input.addEventListener('input', () => updateButtonView(input, button));
  input.addEventListener('focusout', () => updateButtonView(input, button));
  button.addEventListener('click', () => disableElement(button));
};

const renderCarView = async (name: string, color: string, limit: number): Promise<void> => {
  const carAttributes = await getCarAttributes(name, color);
  const { id, carName, carColor } = carAttributes;

  let car = '';

  if (id && carName && carColor && state.carsInGarage < limit) {
    car = renderTrackCar(id, carName, carColor);
    state.carsOnPage.push({ name, color, id });
  }

  if (appElements.carsContainer && state.carsInGarage < limit) {
    appElements.carsContainer.innerHTML += car;
  }

  if (appElements.carsCounter) {
    appElements.carsCounter.innerText = `${state.carsInGarage += 1}`;
  }
};

const handleCreateCarButtonClick = async (e: Event): Promise<void> => {
  e.preventDefault();
  state.carsInGarage = Number(appElements.carsCounter?.innerHTML);

  const pageNumber = Number(appElements.garagePagesCounter?.innerHTML);
  const currentPageCarLimit = state.carsPerPageLimit * pageNumber;
  let name = '';
  let color = '';

  if (appElements.createModelInput instanceof HTMLInputElement) {
    name = appElements.createModelInput.value;
    appElements.createModelInput.value = '';
  }

  if (appElements.createColorInput instanceof HTMLInputElement) {
    color = appElements.createColorInput?.value;
  }

  await renderCarView(name, color, currentPageCarLimit);
  updatePaginationButtonsState();
};

const createCar = (): void => {
  if (appElements.createModelInput && appElements.createButton) {
    updateButtonState(appElements.createModelInput, appElements.createButton);
  }

  appElements.createButton?.addEventListener('click', (e) => handleCreateCarButtonClick(e));
};

const changeUpdateControlsView = (isOn = false): void => {
  const inputElementsToUpdate = [appElements.updateModelInput, appElements.updateColorInput];

  if (!isOn) {
    inputElementsToUpdate.forEach((item) => {
      activateElement(item);
    });

    if (appElements.updateModelInput && appElements.updateButton) {
      updateButtonState(appElements.updateModelInput, appElements.updateButton);
    }
  } else {
    inputElementsToUpdate.forEach((item) => {
      disableElement(item);
    });

    if (appElements.updateModelInput instanceof HTMLInputElement) {
      appElements.updateModelInput.value = '';
    }

    if (appElements.updateButton) disableElement(appElements.updateButton);
  }
};

const deleteActiveClass = (): void => {
  const buttons = document.querySelectorAll('.garage__button-options');
  buttons.forEach((button) => button.classList.remove('active'));
};

const updateWinnerView = (name: string, color: string): void => {
  const winner = document.getElementById(`winner-${state.selectedCarId}`);
  const carImageIndex = 1;
  const carNameIndex = 2;

  if (winner) {
    winner.children[carImageIndex].innerHTML = getCarImage(color);
    winner.children[carNameIndex].innerHTML = name;
  }
};

const updateCar = async (): Promise<void> => {
  let name = '';
  let color = '';

  if (appElements.updateModelInput instanceof HTMLInputElement) {
    name = appElements.updateModelInput.value;
    appElements.updateModelInput.value = '';
  }

  if (appElements.updateColorInput instanceof HTMLInputElement) {
    color = appElements.updateColorInput?.value;
  }

  await updateCarAPI(state.selectedCarId, { name, color });

  const carNameElement = document.getElementById(`car-name-${state.selectedCarId}`);
  const carElement = document.getElementById(`car-${state.selectedCarId}`);

  if (carNameElement) carNameElement.textContent = name;
  if (carElement) carElement.innerHTML = getCarImage(color);

  updateWinnerView(name, color);
};

const deleteWinner = async (page: number, isOnPage: boolean): Promise<void> => {
  await deleteWinnerAPI(state.selectedCarId);

  if (!isOnPage) return;

  const { winners, count: winnersCount } = await getWinners(page);
  state.winnersAtAll = winnersCount || 0;

  if (appElements.winnersTotalCount) {
    appElements.winnersTotalCount.innerHTML = `${state.winnersAtAll}`;
  }

  if (appElements.winnersContainer) {
    appElements.winnersContainer.innerHTML = winners.join('');
  }
};

const deleteCar = async (): Promise<void> => {
  state.currentGaragePage = Number(appElements.garagePagesCounter?.innerHTML);
  state.currentWinnersPage = Number(appElements.winnersPageCounter?.innerHTML);

  const winnersResponse = await getWinnersAPI(state.currentWinnersPage, state.sortBy, state.order);
  const winnersId = winnersResponse?.winners.map((winner) => winner.id);
  const isWinnerOnCurrentPage = winnersId?.includes(state.selectedCarId);
  const trackCar = document.getElementById(`track-car-${state.selectedCarId}`);
  state.carsInGarage = Number(appElements.carsCounter?.innerHTML);

  await deleteCarAPI(state.selectedCarId);
  await deleteWinner(state.currentWinnersPage, !!isWinnerOnCurrentPage);

  if (trackCar) trackCar.remove();

  if (appElements.carsCounter) {
    appElements.carsCounter.innerText = `${state.carsInGarage -= 1}`;
  }

  if (state.carsInGarage >= state.carsPerPageLimit) {
    const { cars } = await getCars(state.currentGaragePage);

    if (appElements.carsContainer && cars) {
      appElements.carsContainer.innerHTML = cars?.join('');
    }
  }

  changeUpdateControlsView(true);
  updatePaginationButtonsState();
};

const handleUpdateButtonClick = (): void => {
  appElements.updateButton?.addEventListener('click', () => updateCar());

  appElements.carsContainer?.addEventListener('click', (e) => {
    const { target } = e;
    let targetId = '';

    if (target instanceof HTMLButtonElement) {
      targetId = target.id;
      state.selectedCarId = Number(targetId.slice(targetId.lastIndexOf('-') + 1));
    }

    if (targetId.match('button-select') && target instanceof HTMLElement) {
      if (target.classList.contains('active')) {
        target.classList.remove('active');
        changeUpdateControlsView(true);
        state.selectedCarId = 0;
      } else {
        deleteActiveClass();
        target.classList.add('active');
        changeUpdateControlsView();
      }
    }

    if (targetId.match('button-remove')) void deleteCar();
  });
};

const generaterandomCars = async (): Promise<void> => {
  const carsToGenerate = 100;
  state.carsInGarage = Number(appElements.carsCounter?.innerHTML);
  const pageNumber = Number(appElements.garagePagesCounter?.innerHTML);
  const currentPageCarLimit = state.carsPerPageLimit * pageNumber;
  const cars: string[] = [];
  const generatedCars: Promise<void>[] = [];

  for (let i = 0; i < carsToGenerate; i += 1) {
    cars.push(getRandomCarName());
  }

  cars.forEach((car) => {
    const color = getRandomColor();
    generatedCars.push(renderCarView(car, color, currentPageCarLimit));
  });

  await Promise.all(generatedCars);
  updatePaginationButtonsState();
};

const handleGenerateButtonClick = (): void => {
  appElements.generateButton?.addEventListener('click', () => generaterandomCars());
};

export {
  handleUpdateButtonClick,
  createCar,
  handleGenerateButtonClick,
};
