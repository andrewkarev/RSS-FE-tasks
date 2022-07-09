import CreateElement from './types/create-el-func';
import Attributes from './types/attributes';

const createEl: CreateElement = (
  tagName: string,

  classNames?: string[] | string,

  innerContent?: HTMLElement[] | string | CreateElement,

  parentNode?: HTMLElement,

  ...attributes: Attributes[]

): HTMLElement => {
  const element: HTMLElement = document.createElement(tagName);

  if (classNames) {
    if (Array.isArray(classNames)) {
      classNames.forEach((className) => element.classList.add(className));
    } else if (typeof classNames === 'string') {
      element.classList.add(`${classNames}`);
    }
  }

  if (innerContent) {
    if (Array.isArray(innerContent)) {
      innerContent.forEach((child) => element.append(child));
    } else if (typeof innerContent === 'object') {
      element.append(innerContent);
    } else if (typeof innerContent === 'string') {
      element.innerHTML = innerContent;
    }
  }

  if (attributes) {
    attributes.forEach(([attrName, attrValue]) => {
      if (attrValue) {
        if (attrName.match(/serialNum|sortId/)) {
          element.dataset[attrName] = `${attrValue}`;
        } else {
          element.setAttribute(attrName, `${attrValue}`);
        }
      } else {
        element.setAttribute(attrName, '');
      }
    });
  }

  if (parentNode) parentNode.append(element);

  return element;
};

export default createEl;
