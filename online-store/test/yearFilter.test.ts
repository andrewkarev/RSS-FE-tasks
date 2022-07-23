import YearFilter from '../src/components/filters/yearFilter';
import goods from '../src/components/data/goodsDataBase';

describe('YearFilter', () => {
  const filter = new YearFilter();

  describe('filterData', () => {
    const result = filter.filterData(goods);

    it('should defines filterData()', () => {
      expect(typeof filter.filterData).toBe('function');
    });

    it('should return defined value', () => {
      expect(result).toBeDefined();
    });

    it('should return an array', () => {
      expect(result).toBeInstanceOf(Array);
    });
  });
});
