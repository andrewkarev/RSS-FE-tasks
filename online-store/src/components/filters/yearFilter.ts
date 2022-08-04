import * as noUiSlider from 'nouislider';
import ICard from '../utils/interfaces/ICard';
import { set as setLocalStorageValue, get as getLocalStorageValue } from '../utils/storage';
import DragFilter from '../utils/abstract-classes/dragFilter';

class YearFilter extends DragFilter {
  public yearSlider?: noUiSlider.target;

  protected relevantValue?: string[];

  public generateFilter([from, to]: string[]): void {
    this.yearSlider = document.getElementById('year-slider') as noUiSlider.target;

    this.relevantValue = [from, to];

    if (this.yearSlider) {
      noUiSlider.create(this.yearSlider, {
        start: [from, to],
        step: 1,
        tooltips: true,
        behaviour: 'drag',
        connect: true,
        range: {
          min: 2019,
          max: 2022,
        },
        format: {
          from(value) {
            return parseInt(value, 10);
          },
          to(value) {
            return Number(value).toFixed();
          },
        },
      });
    }
  }

  public handleDrag(): void {
    const currentValues = this.yearSlider?.noUiSlider?.get() as string[];
    this.relevantValue = currentValues;
    setLocalStorageValue('yearFilter', this.relevantValue);
  }

  public filterData(relevantGoods: ICard[]): ICard[] {
    let filtredGoods: ICard[] = relevantGoods;
    let fromYear: number;
    let toYear: number;

    if (this.relevantValue) {
      fromYear = Number(this.relevantValue[0]);
      toYear = Number(this.relevantValue[1]);
    }

    filtredGoods = relevantGoods.filter((item) => item.year >= fromYear && item.year <= toYear);

    return filtredGoods;
  }

  public reset(): void {
    this.relevantValue = getLocalStorageValue('yearFilter', '["2019", "2022"]');
    this.yearSlider?.noUiSlider?.set(this.relevantValue);
  }
}

export default YearFilter;
