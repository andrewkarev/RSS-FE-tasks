import Popup from '../src/components/popup/menuPopup';

describe('Popup', () => {
  const popup = new Popup();

  describe('.initPopupElement', () => {
    it('should defines initPopupElement()', () => {
      expect(typeof popup.initPopupElement).toBe('function');
    });
    it('initPopupElement() returns undefined when called', () => {
      expect(popup.initPopupElement()).toBeUndefined();
    });
  });

  describe('.displayPopup', () => {
    it('should defines displayPopup()', () => {
      expect(typeof popup.displayPopup).toBe('function');
    });
    it('displayPopup() returns undefined when called', () => {
      expect(popup.displayPopup()).toBeUndefined();
    });
  });
});
