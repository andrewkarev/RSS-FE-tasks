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
}

export default IState;
