import state from './app-state';
import IEngine from './interfaces/IEngine';
import { getRaceParams, startCarMovementAnimation, updateEngineButtonsView } from './engine-controls';
import { switchEngineToDriveMode, stopEngine } from './api';

let raceButton: HTMLElement | null;
let resetButton: HTMLElement | null;
let generateButton: HTMLElement | null;
let previousPageButton: HTMLElement | null;
let nextPageButton: HTMLElement | null;

const initRaceButtons = () => {
  raceButton = document.getElementById('button-race');
  resetButton = document.getElementById('button-reset');
  generateButton = document.getElementById('button-generate');
  previousPageButton = document.getElementById('button-prev');
  nextPageButton = document.getElementById('button-next');
};

const updateRaceButtonsView = (firstButton: HTMLElement, secondButton: HTMLElement) => {
  firstButton?.classList.remove('disabled');
  firstButton?.removeAttribute('disabled');
  secondButton?.classList.add('disabled');
  secondButton?.setAttribute('disbled', '');
  generateButton?.classList.toggle('disabled');

  generateButton?.hasAttribute('disabled')
    ? generateButton.removeAttribute('disabled')
    : generateButton?.setAttribute('disabled', '');
};

const stopAllEngines = async () => {
  const enginesToStop: Promise<IEngine | null>[] = [];

  state.isRace = false;
  state.carsOnPage.forEach((car) => enginesToStop.push(stopEngine(car.id)));

  await Promise.all(enginesToStop);

  state.carsOnPage.forEach((car) => {
    const carToAnimate = document.getElementById(`car-${car.id}`);
    const stopEngineButton = document.getElementById(`stop-engine-car-${car.id}`);

    if (stopEngineButton) updateEngineButtonsView(stopEngineButton, false, car.id);
    window.cancelAnimationFrame(state.carsAnimationId[`${car.id}`]);
    if (carToAnimate) carToAnimate.style.transform = 'translateX(0px)';
  });
};

const changeCarsTrackButtonView = () => {
  const carsIds = state.carsOnPage.map((car) => car.id);
  carsIds.forEach((id) => {
    const startEngineButton = document.getElementById(`start-engine-car-${id}`);
    if (startEngineButton) updateEngineButtonsView(startEngineButton, true, id);
  });
};

const launchAllEngines = async (): Promise<void> => {
  await stopAllEngines();
  changeCarsTrackButtonView();

  state.isRace = true;
  state.raceWinnerId = 0;

  const generatedCars: Promise<
    { velocity: number | undefined; distance: number | undefined; }>[] = [];

  state.carsOnPage.forEach((car) => generatedCars.push(getRaceParams(car.id)));

  await Promise.all(generatedCars);

  const rideDuration = generatedCars.map(async (params) => {
    const { velocity, distance } = await params;
    return (distance || 0) / (velocity || 0);
  });

  state.carsOnPage.forEach(async (car, i) => {
    const carToAnimate = document.getElementById(`car-${car.id}`);
    const time = await rideDuration[i];

    if (carToAnimate) startCarMovementAnimation(time, car.id, carToAnimate);

    const engineStatus = await switchEngineToDriveMode(car.id);

    if (!engineStatus?.success) window.cancelAnimationFrame(state.carsAnimationId[`${car.id}`]);
  });
};

const disablePaginationButtons = (button: HTMLElement) => {
  button?.classList.add('disabled');
  button?.setAttribute('disabled', '');
};

const handleRaceButtonClick = () => {
  raceButton?.addEventListener('click', async () => {
    if (resetButton && raceButton) updateRaceButtonsView(resetButton, raceButton);

    if (previousPageButton && nextPageButton) {
      disablePaginationButtons(previousPageButton);
      disablePaginationButtons(nextPageButton);
    }

    changeCarsTrackButtonView();
    await launchAllEngines();
  });
};

const restorePaginationButtonsView = (button: HTMLElement) => {
  button?.classList.remove('disabled');
  button?.removeAttribute('disabled');
};

const handleResetButtonClick = () => {
  resetButton?.addEventListener('click', async () => {
    await stopAllEngines();

    if (resetButton && raceButton) updateRaceButtonsView(raceButton, resetButton);

    if (state.paginationButtonsState.prevIsActive && previousPageButton) {
      restorePaginationButtonsView(previousPageButton);
    }

    if (state.paginationButtonsState.nextIsActive && nextPageButton) {
      restorePaginationButtonsView(nextPageButton);
    }
  });
};

export { initRaceButtons, handleRaceButtonClick, handleResetButtonClick };
