import state from './app-state';
import IEngine from './interfaces/IEngine';
import { getRaceParams, startCarMovementAnimation, updateEngineButtonsView } from './engine-controls';
import { switchEngineToDriveMode, stopEngine } from './api';
import appElements from './app-elements';
import { disableElement, activateElement, setAppropriateButtonStats } from './utils';

const updateRaceButtonsView = (firstButton: HTMLElement, secondButton: HTMLElement): void => {
  setAppropriateButtonStats(firstButton, false);
  setAppropriateButtonStats(secondButton, true);

  appElements.generateButton?.classList.toggle('disabled');

  appElements.generateButton?.hasAttribute('disabled')
    ? appElements.generateButton.removeAttribute('disabled')
    : appElements.generateButton?.setAttribute('disabled', '');
};

const stopAllEngines = async (): Promise<void> => {
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

const changeCarsTrackButtonView = (): void => {
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

    if (!engineStatus?.success) {
      window.cancelAnimationFrame(state.carsAnimationId[`${car.id}`]);
    }
  });
};

const handleRaceButtonClick = (): void => {
  appElements.raceButton?.addEventListener('click', async () => {
    if (!appElements.resetButton) return;

    if (appElements.raceButton) {
      updateRaceButtonsView(appElements.resetButton, appElements.raceButton);
      setAppropriateButtonStats(appElements.resetButton, true);
    }

    if (appElements.createButton) {
      setAppropriateButtonStats(appElements.createButton, true);
    }

    if (appElements.createModelInput) {
      disableElement(appElements.createModelInput);
    }

    if (appElements.previousPageButton && appElements.nextPageButton) {
      disableElement(appElements.previousPageButton);
      disableElement(appElements.nextPageButton);
    }

    changeCarsTrackButtonView();
    await launchAllEngines();
    setAppropriateButtonStats(appElements.resetButton, false);
  });
};

const handleResetButtonClick = (): void => {
  appElements.resetButton?.addEventListener('click', async () => {
    await stopAllEngines();

    if (!(appElements.createModelInput instanceof HTMLInputElement)) return;

    if (appElements.resetButton && appElements.raceButton) {
      updateRaceButtonsView(appElements.raceButton, appElements.resetButton);
    }

    if (state.paginationButtonsState.prevIsActive && appElements.previousPageButton) {
      activateElement(appElements.previousPageButton);
    }

    if (state.paginationButtonsState.nextIsActive && appElements.nextPageButton) {
      activateElement(appElements.nextPageButton);
    }

    if (appElements.createButton && appElements.createModelInput.value) {
      setAppropriateButtonStats(appElements.createButton, false);
    }

    activateElement(appElements.createModelInput);
  });
};

export { handleRaceButtonClick, handleResetButtonClick };
