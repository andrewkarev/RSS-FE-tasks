import { createCar as createCarAPI } from './api';
import { renderTrackCar } from './UI';

const CARS_PER_PAGE_LIMIT = 7;

let createButton: HTMLElement | null;
let createModelInput: HTMLElement | null;
let createColorInput: HTMLElement | null;
let carsContainer: HTMLElement | null;
let carsCounter: HTMLElement | null;
let pagesCounter: HTMLElement | null;

const initGarageElements = (): void => {
  createButton = document.getElementById('button-create');
  createModelInput = document.getElementById('create-model');
  createColorInput = document.getElementById('create-color');
  carsContainer = document.getElementById('cars');
  carsCounter = document.getElementById('garage-cars-count');
  pagesCounter = document.getElementById('garage-page-count');
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

const handleCreateCarButtonClick = async (e: Event) => {
  e.preventDefault();
  const carsInGarage = Number(carsCounter?.innerHTML);
  const currentPageCarLimit = CARS_PER_PAGE_LIMIT * Number(pagesCounter?.innerHTML);
  let name = '';
  let color = '';
  let car = '';

  if (createModelInput instanceof HTMLInputElement) {
    name = createModelInput.value;
    createModelInput.value = '';
  }

  if (createColorInput instanceof HTMLInputElement) color = createColorInput?.value;

  const carAttributes = await getCarAttributes(name, color);
  const { id, carName, carColor } = carAttributes;

  if (id && carName && carColor && carsInGarage < currentPageCarLimit) {
    car = renderTrackCar(id, carName, carColor);
  }

  if (carsContainer && carsInGarage < currentPageCarLimit) {
    carsContainer.innerHTML += car;
  }

  if (carsCounter) carsCounter.innerText = `${carsInGarage + 1}`;
};

const createCar = (): void => {
  initGarageElements();

  if (createModelInput && createButton) {
    updateButtonState(createModelInput, createButton);
  }

  createButton?.addEventListener('click', (e) => handleCreateCarButtonClick(e));
};

export default createCar;
