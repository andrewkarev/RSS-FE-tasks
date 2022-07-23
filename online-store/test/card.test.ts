import Card from '../src/components/card/card';
import goodsDataBase from '../src/components/data/goodsDataBase';

describe('create()', () => {
  const argument = goodsDataBase[0];
  const card = new Card(argument);
  const spy = jest.spyOn(card, 'create');
  const isCreated = card.create();

  it('should be called once', () => {
    expect(spy).toBeCalledTimes(1);
  });

  it('should have been called', () => {
    expect(spy).toHaveBeenCalled();
  });

  it('shouldn\'t return a defined value', () => {
    expect(isCreated).toBeUndefined();
  });

  afterAll(() => {
    spy.mockRestore();
  });
});
