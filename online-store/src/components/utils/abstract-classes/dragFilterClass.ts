import AbstractFilterClass from './filterClass';

abstract class DragFilter extends AbstractFilterClass {
  abstract handleDrag(e: Event): void;
}

export default DragFilter;
