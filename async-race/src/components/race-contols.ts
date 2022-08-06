import state from './app-state';
import IEngine from './interfaces/IEngine';
import { getRaceParams, startCarMovementAnimation, updateEngineButtonsView } from './engine-controls';
import { switchEngineToDriveMode, stopEngine } from './api';

let raceButton: HTMLElement | null;
let resetButton: HTMLElement | null;
let generateButton: HTMLElement | null;

const initRaceButtons = () => {
  raceButton = document.getElementById('button-race');
  resetButton = document.getElementById('button-reset');
  generateButton = document.getElementById('button-generate');
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

const launchAllEngines = async (): Promise<void> => {
  const generatedCars: Promise<
    { velocity: number | undefined; distance: number | undefined; }>[] = [];

  state.carsOnPage.forEach((car) => generatedCars.push(getRaceParams(car.id)));

  await Promise.all(generatedCars);

  const rideDuration = generatedCars.map(async (params) => {
    const { velocity, distance } = await params;
    return (distance || 0) / (velocity || 0);
  });

  state.carsOnPage.forEach(async (car, i) => {
    const time = await rideDuration[i];
    const carToAnimate = document.getElementById(`car-${car.id}`);
    const startEngineButton = document.getElementById(`start-engine-car-${car.id}`);

    if (startEngineButton) updateEngineButtonsView(startEngineButton, true, car.id);

    if (carToAnimate) startCarMovementAnimation(time, car.id, carToAnimate);

    const engineStatus = await switchEngineToDriveMode(car.id);

    if (!engineStatus?.success) window.cancelAnimationFrame(state.carsAnimationId[`${car.id}`]);
  });
};

const stopAllEngines = async () => {
  const enginesToStop: Promise<IEngine | null>[] = [];

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

const handleRaceButtonClick = () => {
  raceButton?.addEventListener('click', async () => {
    await launchAllEngines();
    if (resetButton && raceButton) updateRaceButtonsView(resetButton, raceButton);
  });
};

const handleResetButtonClick = () => {
  resetButton?.addEventListener('click', async () => {
    await stopAllEngines();
    if (resetButton && raceButton) updateRaceButtonsView(raceButton, resetButton);
  });
};

export { initRaceButtons, handleRaceButtonClick, handleResetButtonClick };
