import ICar from '../interfaces/ICar';

type Cars = Promise<{ cars: ICar[], count: string | null } | null>;

export default Cars;
