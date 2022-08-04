import IState from './interfaces/IState';

const state: IState = {
  carsBrands: [
    'Tesla',
    'Aston Martin',
    'Rolls-Royce',
    'Ferrari',
    'Lamborghini',
    'Porsche',
    'Maserati',
    'Ford',
    'Mercedes',
    'Audi',
  ],
  carsModels: [
    'Model S',
    'DBS',
    'Phantom (VII)',
    'Roma',
    'huracan',
    'Carrera GT',
    'GranTurismo',
    'Mustang Shelby GT 500',
    'AMG GT',
    'R8',
  ],
  carsInGarage: 0,
  winnersAtAll: 0,
  carsPerPageLimit: 7,
  winnersPerPageLimit: 10,
  selectedCarId: 0,
  currentGaragePage: 1,
  currentWinnersPage: 1,
  currentPage: 'garage',
  carsAnimationId: {},
};

export default state;
