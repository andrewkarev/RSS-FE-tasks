import AbstractFilter from './abstractFilter';

abstract class ClickFilter extends AbstractFilter {
  public abstract handleClick(e: Event): void;
}

export default ClickFilter;
