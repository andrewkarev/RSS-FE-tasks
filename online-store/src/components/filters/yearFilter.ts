import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import ICard from '../utils/interfaces/ICard';
import { set } from '../utils/storage';
import DragFilter from '../utils/abstract-classes/dragFilterClass';

class YearFilter extends DragFilter {
  yearSlider?: noUiSlider.target;

  relevantValue?: string[];

  generateFilter([from, to]: string[]): void {
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

  handleDrag(): void {
    const currentValues = this.yearSlider?.noUiSlider?.get() as string[];
    this.relevantValue = currentValues;
    set('yearFilter', this.relevantValue);
  }

  filterData(relevantGoods: ICard[]): ICard[] {
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
}

export default YearFilter;
