import {
  createCar as createCarAPI,
  updateCar as updateCarAPI,
  deleteCar as deleteCarAPI,
  deleteWinner as deleteWinnerAPI,
  getWinners as getWinnersAPI,
} from './api';
import { renderTrackCar, getCarImage } from './UI';
import { getCars, getWinners } from './app-render';
import { getRandomColor, getRandomCarName } from './utils';
import state from './app-state';

let createButton: HTMLElement | null;
let createModelInput: HTMLElement | null;
let createColorInput: HTMLElement | null;
let carsContainer: HTMLElement | null;
let carsCounter: HTMLElement | null;
let pagesCounter: HTMLElement | null;
let updateButton: HTMLElement | null;
let updateModelInput: HTMLElement | null;
let updateColorInput: HTMLElement | null;
let winnersPageCounter: HTMLElement | null;
let generateButton: HTMLElement | null;

const initGarageElements = (): void => {
  createButton = document.getElementById('button-create');
  createModelInput = document.getElementById('create-model');
  createColorInput = document.getElementById('create-color');
  carsContainer = document.getElementById('cars');
  carsCounter = document.getElementById('garage-cars-count');
  pagesCounter = document.getElementById('garage-page-count');
  updateButton = document.getElementById('button-update');
  updateModelInput = document.getElementById('update-model');
  updateColorInput = document.getElementById('update-color');
  winnersPageCounter = document.getElementById('winners-page-count');
  generateButton = document.getElementById('button-generate');
};

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

const disableButton = (button: HTMLElement): void => {
  button.classList.add('disabled');
  button.setAttribute('disabled', '');
};

const activateButton = (button: HTMLElement): void => {
  button.classList.remove('disabled');
  button.removeAttribute('disabled');
};

const updateButtonView = (input: HTMLElement, button: HTMLElement): void => {
  if (input instanceof HTMLInputElement && !input.value) {
    disableButton(button);
  }

  if (input instanceof HTMLInputElement && input.value) {
    activateButton(button);
  }
};

const updateButtonState = (input: HTMLElement, button: HTMLElement): void => {
  input.addEventListener('focus', () => {
    if (button) updateButtonView(input, button);
  });

  input.addEventListener('input', () => {
    if (button) updateButtonView(input, button);
  });

  input.addEventListener('focusout', () => {
    if (button) updateButtonView(input, button);
  });

  button.addEventListener('click', () => {
    disableButton(button);
  });
};

const renderCarView = async (name: string, color: string, limit: number): Promise<void> => {
  const carAttributes = await getCarAttributes(name, color);
  const { id, carName, carColor } = carAttributes;

  let car = '';

  if (id && carName && carColor && state.carsInGarage < limit) {
    car = renderTrackCar(id, carName, carColor);
  }

  if (carsContainer && state.carsInGarage < limit) {
    carsContainer.innerHTML += car;
  }

  if (carsCounter) carsCounter.innerText = `${state.carsInGarage += 1}`;
};

const handleCreateCarButtonClick = async (e: Event): Promise<void> => {
  e.preventDefault();
  state.carsInGarage = Number(carsCounter?.innerHTML);
  const currentPageCarLimit = state.carsPerPageLimit * Number(pagesCounter?.innerHTML);
  let name = '';
  let color = '';

  if (createModelInput instanceof HTMLInputElement) {
    name = createModelInput.value;
    createModelInput.value = '';
  }

  if (createColorInput instanceof HTMLInputElement) color = createColorInput?.value;

  await renderCarView(name, color, currentPageCarLimit);
};

const createCar = (): void => {
  initGarageElements();

  if (createModelInput && createButton) {
    updateButtonState(createModelInput, createButton);
  }

  createButton?.addEventListener('click', (e) => handleCreateCarButtonClick(e));
};

const changeUpdateControlsView = (isOn = false): void => {
  const updateInputElements = [updateModelInput, updateColorInput];

  if (!isOn) {
    updateInputElements.forEach((item) => {
      item?.classList.remove('disabled');
      item?.removeAttribute('disabled');
    });

    if (updateModelInput && updateButton) updateButtonState(updateModelInput, updateButton);
  } else {
    updateInputElements.forEach((item) => {
      item?.classList.add('disabled');
      item?.setAttribute('disabled', '');
    });

    if (updateModelInput instanceof HTMLInputElement) updateModelInput.value = '';
    if (updateButton) disableButton(updateButton);
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

  if (updateModelInput instanceof HTMLInputElement) {
    name = updateModelInput.value;
    updateModelInput.value = '';
  }

  if (updateColorInput instanceof HTMLInputElement) color = updateColorInput?.value;

  await updateCarAPI(state.selectedCarId, { name, color });
  const carNameElement = document.getElementById(`car-name-${state.selectedCarId}`);
  const carElement = document.getElementById(`car-${state.selectedCarId}`);
  if (carNameElement) carNameElement.textContent = name;
  if (carElement) carElement.innerHTML = getCarImage(color);

  updateWinnerView(name, color);
};

const deleteWinner = async (page: number, isOnPage: boolean): Promise<void> => {
  await deleteWinnerAPI(state.selectedCarId);
  if (isOnPage) {
    const { winners } = await getWinners(page);
    const winnersContainer = document.getElementById('winning-cars');
    if (winnersContainer) winnersContainer.innerHTML = winners.join('');
  }
};

const deleteCar = async (): Promise<void> => {
  const currentGaragePage = Number(pagesCounter?.innerHTML);
  const currentWinnersPage = Number(winnersPageCounter?.innerHTML);
  const winnersResponse = await getWinnersAPI(currentWinnersPage);
  const winnersId = winnersResponse?.winners.map((winner) => winner.id);
  const isWinnerOnCurrentPage = winnersId?.includes(state.selectedCarId);
  const trackCar = document.getElementById(`track-car-${state.selectedCarId}`);
  state.carsInGarage = Number(carsCounter?.innerHTML);

  await deleteCarAPI(state.selectedCarId);
  await deleteWinner(currentWinnersPage, !!isWinnerOnCurrentPage);

  if (trackCar) trackCar.remove();
  if (carsCounter) carsCounter.innerText = `${state.carsInGarage -= 1}`;
  if (state.carsInGarage >= state.carsPerPageLimit) {
    const { cars } = await getCars(currentGaragePage);
    if (carsContainer && cars) carsContainer.innerHTML = cars?.join('');
  }

  changeUpdateControlsView(true);
};

const handleUpdateButtonClick = (): void => {
  updateButton?.addEventListener('click', () => updateCar());

  carsContainer?.addEventListener('click', (e) => {
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
  state.carsInGarage = Number(carsCounter?.innerHTML);
  const currentPageCarLimit = state.carsPerPageLimit * Number(pagesCounter?.innerHTML);
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
};

const handleGenerateButtonClick = () => {
  generateButton?.addEventListener('click', () => generaterandomCars());
};

export { handleUpdateButtonClick, createCar, handleGenerateButtonClick };
