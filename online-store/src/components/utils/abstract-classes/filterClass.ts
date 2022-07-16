import ICard from '../interfaces/ICard';

abstract class AbstractFilterClass {
  public container?: HTMLElement;

  protected relevantValue?: string[];

  public abstract generateFilter(filterOptions: string[]): void;

  public abstract filterData(relevantGoods: ICard[]): ICard[];

  public abstract reset(): void;
}

export default AbstractFilterClass;
