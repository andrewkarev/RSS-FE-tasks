import {
  createCar as createCarAPI,
  updateCar as updateCarAPI,
} from './api';
import { renderTrackCar, getCarImage } from './UI';

const CARS_PER_PAGE_LIMIT = 7;

let createButton: HTMLElement | null;
let createModelInput: HTMLElement | null;
let createColorInput: HTMLElement | null;
let carsContainer: HTMLElement | null;
let carsCounter: HTMLElement | null;
let pagesCounter: HTMLElement | null;
let updateButton: HTMLElement | null;
let updateModelInput: HTMLElement | null;
let updateColorInput: HTMLElement | null;

let selectedCArId = 0;

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

const deleteActiveClass = () => {
  const buttons = document.querySelectorAll('.garage__button-options');
  buttons.forEach((button) => button.classList.remove('active'));
};

const updateCar = async () => {
  let name = '';
  let color = '';

  if (updateModelInput instanceof HTMLInputElement) {
    name = updateModelInput.value;
    updateModelInput.value = '';
  }

  if (updateColorInput instanceof HTMLInputElement) color = updateColorInput?.value;

  await updateCarAPI(selectedCArId, { name, color });
  const carNameElement = document.getElementById(`car-name-${selectedCArId}`);
  const carElement = document.getElementById(`car-${selectedCArId}`);
  if (carNameElement) carNameElement.textContent = name;
  if (carElement) carElement.innerHTML = getCarImage(color);
};

const handleUodateButtonClick = (): void => {
  updateButton?.addEventListener('click', () => updateCar());
};

const handleUpdateButtonClick = (): void => {
  handleUodateButtonClick();
  carsContainer?.addEventListener('click', (e) => {
    const { target } = e;
    let targetId = '';

    if (target instanceof HTMLButtonElement) {
      targetId = target.id;
      selectedCArId = Number(targetId.slice(targetId.lastIndexOf('-') + 1));
    }

    if (targetId.match('button-select') && target instanceof HTMLElement) {
      if (target.classList.contains('active')) {
        target.classList.remove('active');
        changeUpdateControlsView(true);
      } else {
        deleteActiveClass();
        target.classList.add('active');
        changeUpdateControlsView();
      }
    }

    if (targetId.match('button-remove')) {
      console.log('call car delete function');
    }
  });
};

export { handleUpdateButtonClick, createCar };
