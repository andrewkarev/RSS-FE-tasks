import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import ICard from '../utils/interfaces/ICard';
import { set, get } from '../utils/storage';
import DragFilter from '../utils/abstract-classes/dragFilterClass';

class QuantityFilter extends DragFilter {
  public quantitySlider?: noUiSlider.target;

  protected relevantValue?: string[];

  public generateFilter([from, to]: string[]): void {
    this.quantitySlider = document.getElementById('quantity-slider') as noUiSlider.target;

    this.relevantValue = [from, to];

    if (this.quantitySlider) {
      noUiSlider.create(this.quantitySlider, {
        start: [from, to],
        step: 1,
        tooltips: true,
        behaviour: 'drag',
        connect: true,
        range: {
          min: 1,
          max: 19,
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
    const currentValues = this.quantitySlider?.noUiSlider?.get() as string[];
    this.relevantValue = currentValues;
    set('quantityFilter', this.relevantValue);
  }

  public filterData(relevantGoods: ICard[]): ICard[] {
    let filtredGoods: ICard[] = relevantGoods;
    let fromQuantity: number;
    let toQuantity: number;

    if (this.relevantValue) {
      fromQuantity = parseInt(this.relevantValue[0], 10);
      toQuantity = parseInt(this.relevantValue[1], 10);
    }

    filtredGoods = relevantGoods
      .filter((item) => item.quantity >= fromQuantity && item.quantity <= toQuantity);

    return filtredGoods;
  }

  public reset(): void {
    this.relevantValue = get('quantityFilter', '["1", "19"]');
    this.quantitySlider?.noUiSlider?.set(this.relevantValue);
  }
}

export default QuantityFilter;
