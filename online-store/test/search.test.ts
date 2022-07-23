import Search from '../src/components/search/search';
import goods from '../src/components/data/goodsDataBase';

describe('Serach', () => {
  const search = new Search();

  describe('filterData', () => {
    const result = search.filterData(goods);

    it('should defines filterData()', () => {
      expect(typeof search.filterData).toBe('function');
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
  });
});
