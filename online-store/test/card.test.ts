import CardElement from '../src/components/card/card';
import goodsDataBase from '../src/components/data/goodsDataBase';
import CreateElement from '../src/components/utils/types/createElFunc';
import * as localStorage from '../src/components/utils/storage';
import createEl from '../src/components/utils/createEl';

jest.mock('../src/components/utils/createEl', () => {
  const originalModule: CreateElement = jest.requireActual('../src/components/utils/createEl');

  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked createEl'),
  };
});

describe('CardElement', () => {
  const argument = goodsDataBase[0];
  const card = new CardElement(argument);
  const getLocalStorageValue = jest.spyOn(localStorage, 'get');
  card.create();

  it('get should be called twice', () => {
    expect(getLocalStorageValue).toBeCalledTimes(2);
  });

  it('get should be called with appropriate arguments', () => {
    expect(getLocalStorageValue).toBeCalledWith('savedItems', '[]');
    expect(getLocalStorageValue).toBeCalledWith('shoppingCart', '[]');
  });

  it('createEl should be called once', () => {
    expect(createEl).toBeCalledTimes(1);
  });

  it('createEl should be called with appropriate arguments', () => {
    const tagName = 'div';
    const className = 'goods__card';
    const cardInner = `
      <h2 class="goods__title">${argument.model}</h2>
      <figure class="goods__item">
        <img class="goods__img" src="${argument.img}" alt="${argument.model}">
        <figcaption class="goods__caption">
          ${argument.brand} / ${argument.year} / ${argument.color} / ${argument.storage}GB<br>
          $${argument.price} / ${argument.popular ? 'popular' : 'not so popular'} / ${argument.quantity} in stock
        </figcaption>
      </figure>
      <div class="btn-container">
        <button class=" goods__save-button button " type="button">Save</button>
        <button class="goods__buy-button button " type="button">Buy</button>
      </div>`;
    const attributes = ['serialNum', 1];

    expect(createEl).toBeCalledWith(tagName, className, cardInner, undefined, attributes);
  });

  it('createEl should be equal to mocked createEl', () => {
    const defaultExportResult = createEl('div');
    expect(defaultExportResult).toBe('mocked createEl');
  });
});
