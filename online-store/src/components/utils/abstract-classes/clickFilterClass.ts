import AbstractFilterClass from './filterClass';

abstract class ClickFilter extends AbstractFilterClass {
  public abstract handleClick(e: Event): void;
}

export default ClickFilter;
