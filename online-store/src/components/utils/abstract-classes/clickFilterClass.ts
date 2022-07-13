import AbstractFilterClass from './filterClass';

abstract class ClickFilter extends AbstractFilterClass {
  abstract handleClick(e: Event): void;
}

export default ClickFilter;
