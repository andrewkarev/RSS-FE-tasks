import createEl from '../utils/createEl';
import ICard from '../utils/interfaces/ICard';
import { get as getLocalStorageValue } from '../utils/storage';

export default class Card {
  private brand: string;

  private model: string;

  private year: number;

  private color: string;

  private storage: number;

  private price: number;

  private popular: boolean;

  private quantity: number;

  private img: string;

  private serialNum: string;

  public div?: Node;

  constructor(
    {
      brand, model, year, color, storage, price, popular, quantity, img, serialNum,
    }: ICard,
  ) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.color = color;
    this.storage = storage;
    this.price = price;
    this.popular = popular;
    this.quantity = quantity;
    this.img = img;
    this.serialNum = serialNum;
  }

  public create(): void {
    const savedCards: string[] = getLocalStorageValue('savedItems', '[]');
    const cardsInCart: string[] = getLocalStorageValue('shoppingCart', '[]');
    const isSaved = savedCards.includes(this.serialNum);
    const isInCArt = cardsInCart.includes(this.serialNum);

    const cardInner = `
      <h2 class="goods__title">${this.model}</h2>
      <figure class="goods__item">
        <img class="goods__img" src="${this.img}" alt="${this.model}">
        <figcaption class="goods__caption">
          ${this.brand} / ${this.year} / ${this.color} / ${this.storage}GB<br>
          $${this.price} / ${this.popular ? 'popular' : 'not so popular'} / ${this.quantity} in stock
        </figcaption>
      </figure>
      <div class="btn-container">
        <button class=" goods__save-button button ${isSaved ? 'checked' : ''}" type="button">${isSaved ? '✔' : 'Save'}</button>
        <button class="goods__buy-button button ${isInCArt ? 'checked' : ''}" type="button">${isInCArt ? '✔' : 'Buy'}</button>
      </div>`;

    this.div = createEl('div', 'goods__card', cardInner, undefined, ['serialNum', +this.serialNum]);
  }
}
