import * as API from './api';
import * as UI from './UI';

const getCars = async (page = 1): Promise<{
  cars: string[] | undefined;
  count: number | undefined;
}> => {
  const garageStats = await API.getCars(page);
  const cars = garageStats?.cars.map((car) => UI.renderTrackCar(car.id, car.name, car.color));
  const count = garageStats?.count;
  return {
    cars,
    count,
  };
};

const getWinners = async (page = 1): Promise<{
  winners: string[];
  count: number | undefined;
}> => {
  const winnersStats = await API.getWinners(page);
  const winnersResponse = winnersStats?.winners
    .map(async (winner, i) => {
      const car = await API.getCar(winner.id);
      const color = car?.color ? car?.color : '#ffffff';
      const image = UI.getCarImage(color);
      const name = car?.name ? car?.name : 'Tesla Model S';
      return UI.renderWinner(i + 1, image, name, winner.wins, winner.time, winner.id);
    });
  let winnersItems: string[] = [];

  if (winnersResponse) winnersItems = await Promise.all(winnersResponse);

  const winners = winnersItems;
  const count = winnersStats?.count;
  return {
    winners,
    count,
  };
};

const renderApp = async (page = 1): Promise<void> => {
  const { cars, count: carsCount } = await getCars(page);
  const garageTrack = UI.renderGarageTrack(carsCount || 1, cars || [], page);
  const garageView = UI.renderGarage(garageTrack);

  const { winners, count: winnersCount } = await getWinners(page);
  const winnersView = UI.renderWinners(winners || [], winnersCount || 1, page);

  UI.render(garageView, winnersView);
};

export { renderApp, getCars };
