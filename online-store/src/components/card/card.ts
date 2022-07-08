import createEl from '../utils/create-el';
import ICard from '../utils/interfaces/ICard';

export default class Card {
  brand: string;

  model: string;

  year: number;

  color: string;

  storage: number;

  price: number;

  popular: boolean;

  img: string;

  serialNum: number;

  div?: Node;

  constructor(
    {
      brand, model, year, color, storage, price, popular, img, serialNum,
    }: ICard,
  ) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.color = color;
    this.storage = storage;
    this.price = price;
    this.popular = popular;
    this.img = img;
    this.serialNum = serialNum;
  }

  create() {
    const cardInner = `
      <h2 class="goods__title">${this.model}</h2>
      <figure class="goods__item">
        <img class="goods__img" src="${this.img}" alt="${this.model}">
        <figcaption class="goods__caption">
          ${this.brand} / ${this.year} / ${this.color} / ${this.storage}GB<br>
          $${this.price} / ${this.popular ? 'popular' : 'not so popular'}
        </figcaption>
      </figure>
      <div class="btn-container">
        <button class=" goods__save-button button" type="button">Save</button>
        <button class="goods__buy-button button" type="button">Buy</button>
      </div>`;

    this.div = createEl('div', 'goods__card', cardInner, undefined, ['serialNum', +this.serialNum]);
  }
}
