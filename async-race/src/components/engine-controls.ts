import * as API from './api';
import state from './app-state';
import { handleAnimationEnd } from './utils';
import { handleRaceResults } from './winners-table';

let carsContainer: HTMLElement | null;

const getCarsContainer = (): void => {
  carsContainer = document.getElementById('cars');
};

const updateEngineButtonsView = (target: HTMLElement, isStart: boolean, id: number): void => {
  const secondButton = isStart
    ? document.getElementById(`stop-engine-car-${id}`)
    : document.getElementById(`start-engine-car-${id}`);
  const removeButton = document.getElementById(`button-remove-${id}`);

  if (isStart) {
    removeButton?.setAttribute('disabled', '');
    removeButton?.classList.add('disabled');
  } else {
    removeButton?.removeAttribute('disabled');
    removeButton?.classList.remove('disabled');
  }

  target.classList.add('disabled');
  target.setAttribute('disabled', '');
  secondButton?.classList.remove('disabled');
  secondButton?.removeAttribute('disabled');
};

const getRaceParams = async (id: number): Promise<{
  velocity: number | undefined;
  distance: number | undefined;
}> => {
  const response = await API.startEngine(id);
  const velocity = response?.velocity;
  const distance = response?.distance;
  return { velocity, distance };
};

const startCarMovementAnimation = (duration: number, id: number, car: HTMLElement): void => {
  const carToAnimate = car;
  const finishFlag = document.getElementById(`flag-${id}`);
  const carOffset = carToAnimate?.offsetLeft;
  const flagOffset = finishFlag?.offsetLeft;
  const flagWidth = finishFlag?.clientWidth;
  const start = performance.now();

  const animate = async (time: number): Promise<void> => {
    let timeFraction = ((time - start) / duration) ** 2;
    let trackWidth = 0;

    if (timeFraction > 1) timeFraction = 1;
    if (flagOffset && carOffset && flagWidth) trackWidth = flagOffset + flagWidth - carOffset;

    const progress = timeFraction * trackWidth;

    if (carToAnimate) carToAnimate.style.transform = `translateX(${progress}px)`;

    if (timeFraction < 1) {
      state.carsAnimationId[`${id}`] = window.requestAnimationFrame(animate);
    } else if (!state.raceWinnerId && state.isRace) {
      handleAnimationEnd(id, duration);
      await handleRaceResults(id, duration);
    }
  };

  state.carsAnimationId[`${id}`] = window.requestAnimationFrame(animate);
};

const handleEngineButtonsClick = (): void => {
  getCarsContainer();

  carsContainer?.addEventListener('click', async (e) => {
    const { target } = e;
    let targetIdAttribute = '';
    let id = 0;

    if (target instanceof HTMLButtonElement) {
      targetIdAttribute = target.id;
      id = Number(targetIdAttribute.slice(targetIdAttribute.lastIndexOf('-') + 1));
    }

    const carToAnimate = document.getElementById(`car-${id}`);

    if (!carToAnimate) return;

    if (targetIdAttribute.match('start-engine-car') && target instanceof HTMLElement) {
      state.isRace = false;
      updateEngineButtonsView(target, true, id);
      const { velocity, distance } = await getRaceParams(id);
      const rideDuration = (distance || 0) / (velocity || 0);
      startCarMovementAnimation(rideDuration, id, carToAnimate);
      const engineStatus = await API.switchEngineToDriveMode(id);

      if (!engineStatus?.success) window.cancelAnimationFrame(state.carsAnimationId[`${id}`]);
    }

    if (targetIdAttribute.match('stop-engine-car') && target instanceof HTMLElement) {
      await API.stopEngine(id);
      updateEngineButtonsView(target, false, id);
      window.cancelAnimationFrame(state.carsAnimationId[`${id}`]);
      carToAnimate.style.transform = 'translateX(0px)';
    }
  });
};

export {
  handleEngineButtonsClick,
  getRaceParams,
  startCarMovementAnimation,
  updateEngineButtonsView,
};
