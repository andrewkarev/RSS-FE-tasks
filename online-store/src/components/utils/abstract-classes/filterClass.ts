import ICard from '../interfaces/ICard';

abstract class AbstractFilterClass {
  container?: HTMLElement;

  relevantValue?: string[];

  abstract generateFilter(filterOptions: string[]): void;

  abstract filterData(elevantGoods: ICard[]): ICard[];
}

export default AbstractFilterClass;
