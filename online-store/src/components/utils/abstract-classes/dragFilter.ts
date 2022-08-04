import AbstractFilter from './abstractFilter';

abstract class DragFilter extends AbstractFilter {
  public abstract handleDrag(e: Event): void;
}

export default DragFilter;
