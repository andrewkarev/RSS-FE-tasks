import Cards from '../src/components/cards/cards';

describe('Cards', () => {
  const cards = new Cards();

  it('should defines generateCards()', () => {
    expect(typeof cards.generateCards).toBe('function');
  });
});
