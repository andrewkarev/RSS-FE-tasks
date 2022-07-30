import ICar from '../interfaces/ICar';

type Cars = Promise<{ cars: ICar[], count: number } | null>;

export default Cars;
