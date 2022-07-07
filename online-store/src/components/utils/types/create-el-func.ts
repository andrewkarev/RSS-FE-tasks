import Attributes from './attributes';

type CreateElement = (
  tagName: string,
  classNames?: string[] | string,
  innerContent?: HTMLElement[] | string | CreateElement,
  parentNode?: HTMLElement,
  ...attributes: Attributes[]
) => HTMLElement;

export default CreateElement;
