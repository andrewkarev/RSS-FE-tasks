import AbstractFilterClass from './filterClass';

abstract class DragFilter extends AbstractFilterClass {
  public abstract handleDrag(e: Event): void;
}

export default DragFilter;
