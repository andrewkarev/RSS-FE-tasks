import NavMenu from '../src/components/nav-menu/navMenu';

describe('NavMenu', () => {
  const navMenu = new NavMenu();

  describe('.initMenu', () => {
    it('should defines initMenu()', () => {
      expect(typeof navMenu.initMenu).toBe('function');
    });
  });

  describe('.handleCardClick', () => {
    it('should defines handleCardClick()', () => {
      expect(typeof navMenu.handleCardClick).toBe('function');
    });
  });
});
