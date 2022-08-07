import ICar from './ICar';

interface IState {
  carsBrands: string[],
  carsModels: string[],
  carsInGarage: number,
  winnersAtAll: number,
  carsPerPageLimit: number,
  winnersPerPageLimit: number,
  selectedCarId: number,
  currentGaragePage: number,
  currentWinnersPage: number,
  currentPage: string,
  carsAnimationId: { [index: string]: number },
  carsOnPage: ICar[],
  raceWinnerId: number,
  isRace: boolean,
  paginationButtonsState: {
    prevIsActive: boolean,
    nextIsActive: boolean,
  },
  sortBy: string,
  order: string,
  winsOrder: string,
  timeOrder: string,
}

export default IState;
