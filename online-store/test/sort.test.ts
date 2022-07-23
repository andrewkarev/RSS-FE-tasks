import Sort from '../src/components/cards-sort/sort';
import goods from '../src/components/data/goodsDataBase';
import ICard from '../src/components/utils/interfaces/ICard';

describe('Sort', () => {
  const sort = new Sort();
  let result: ICard[];
  const firstEkement = {
    brand: 'Apple',
    model: 'iPhone SE',
    year: 2022,
    color: 'white',
    storage: 64,
    price: 499,
    popular: false,
    quantity: 7,
    img: './assets/images/cards/1.png',
    serialNum: '1',
  };

  describe('sortGoods', () => {
    beforeAll(() => {
      result = sort.sortGoods(goods);
    });

    it('should defines sortGoods()', () => {
      expect(typeof sort.sortGoods).toBe('function');
    });

    it('should return defined value', () => {
      expect(result).toBeDefined();
    });

    it('should return correct value', () => {
      expect(result).toEqual(goods);
    });

    it('should return an array', () => {
      expect(result).toBeInstanceOf(Array);
    });

    it('should return an array with correct item', () => {
      expect(result[0]).toEqual(firstEkement);
    });
  });
});
