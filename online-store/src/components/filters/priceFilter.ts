import * as noUiSlider from 'nouislider';
import ICard from '../utils/interfaces/ICard';
import { set as setLocalStorageValue, get as getLocalStorageValue } from '../utils/storage';
import DragFilter from '../utils/abstract-classes/dragFilter';

class PriceFilter extends DragFilter {
  public priceSlider?: noUiSlider.target;

  protected relevantValue?: string[];

  public generateFilter([from, to]: string[]): void {
    this.priceSlider = document.getElementById('price-slider') as noUiSlider.target;

    this.relevantValue = [from, to];

    if (this.priceSlider) {
      noUiSlider.create(this.priceSlider, {
        start: [from, to],
        step: 1,
        tooltips: true,
        behaviour: 'drag',
        connect: true,
        range: {
          min: 1,
          max: 1299,
        },
        format: {
          from(value) {
            return parseInt(value, 10);
          },
          to(value) {
            const output = `${Number(value).toFixed()} $`;
            return output;
          },
        },
      });
    }
  }

  public handleDrag(): void {
    const currentValues = this.priceSlider?.noUiSlider?.get() as string[];
    this.relevantValue = currentValues;
    setLocalStorageValue('priceFilter', this.relevantValue);
  }

  public filterData(relevantGoods: ICard[]): ICard[] {
    let filtredGoods: ICard[] = relevantGoods;
    let fromPrice: number;
    let toPrice: number;

    if (this.relevantValue) {
      fromPrice = parseInt(this.relevantValue[0], 10);
      toPrice = parseInt(this.relevantValue[1], 10);
    }

    filtredGoods = relevantGoods.filter((item) => item.price >= fromPrice && item.price <= toPrice);

    return filtredGoods;
  }

  public reset(): void {
    this.relevantValue = getLocalStorageValue('priceFilter', '["1", "1299"]');
    this.priceSlider?.noUiSlider?.set(this.relevantValue);
  }
}

export default PriceFilter;
