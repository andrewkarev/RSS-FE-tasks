import state from './app-state';
import IEngine from './interfaces/IEngine';
import { getRaceParams, startCarMovementAnimation, updateEngineButtonsView } from './engine-controls';
import { switchEngineToDriveMode, stopEngine } from './api';
import appElements from './app-elements';

const setAppropriateButtonStats = (button: HTMLElement, isAddition: boolean) => {
  if (isAddition) {
    button.classList.add('disabled');
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove('disabled');
    button.removeAttribute('disabled');
  }
};

const updateRaceButtonsView = (firstButton: HTMLElement, secondButton: HTMLElement) => {
  setAppropriateButtonStats(firstButton, false);
  setAppropriateButtonStats(secondButton, true);

  appElements.generateButton?.classList.toggle('disabled');
  appElements.generateButton?.hasAttribute('disabled')
    ? appElements.generateButton.removeAttribute('disabled')
    : appElements.generateButton?.setAttribute('disabled', '');
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
  appElements.raceButton?.addEventListener('click', async () => {
    if (appElements.resetButton && appElements.raceButton) {
      updateRaceButtonsView(appElements.resetButton, appElements.raceButton);
      setAppropriateButtonStats(appElements.resetButton, true);
    }

    if (appElements.createButton) {
      setAppropriateButtonStats(appElements.createButton, true);
    }

    if (appElements.previousPageButton && appElements.nextPageButton) {
      disablePaginationButtons(appElements.previousPageButton);
      disablePaginationButtons(appElements.nextPageButton);
    }

    changeCarsTrackButtonView();
    await launchAllEngines();

    if (appElements.resetButton) {
      setAppropriateButtonStats(appElements.resetButton, false);
    }
  });
};

const restorePaginationButtonsView = (button: HTMLElement) => {
  button?.classList.remove('disabled');
  button?.removeAttribute('disabled');
};

const handleResetButtonClick = () => {
  appElements.resetButton?.addEventListener('click', async () => {
    await stopAllEngines();

    if (appElements.resetButton && appElements.raceButton) {
      updateRaceButtonsView(appElements.raceButton, appElements.resetButton);
    }

    if (state.paginationButtonsState.prevIsActive && appElements.previousPageButton) {
      restorePaginationButtonsView(appElements.previousPageButton);
    }

    if (state.paginationButtonsState.nextIsActive && appElements.nextPageButton) {
      restorePaginationButtonsView(appElements.nextPageButton);
    }

    if (appElements.createButton
      && appElements.createModelInput instanceof HTMLInputElement
      && appElements.createModelInput.value) {
      setAppropriateButtonStats(appElements.createButton, false);
    }
  });
};

export { handleRaceButtonClick, handleResetButtonClick };
