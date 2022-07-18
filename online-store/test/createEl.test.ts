import createEl from '../src/components/utils/createEl';

describe('createEl', () => {
  let result: HTMLElement;
  let expectation: HTMLElement;

  beforeAll(() => {
    expectation = document.createElement('div');
  });

  it('should return value', () => {
    result = createEl('div', 'class', 'test');
    expect(result).toBeDefined();
  });

  it('shouldn\'t return falsy value', () => {
    result = createEl('div', 'class', 'test');
    expect(result).not.toBeFalsy();
  });

  it('should return HTMLElement with proper class and inner content', () => {
    result = createEl('div', 'class', 'test');
    expectation.classList.add('class');
    expectation.textContent = 'test';
    expect(result).toEqual(expectation);
  });

  it('should acccept array of classes', () => {
    result = createEl('div', ['class', 'test'], 'test');
    expectation.classList.add('class', 'test');
    expectation.textContent = 'test';
    expect(result).toEqual(expectation);
  });
});
