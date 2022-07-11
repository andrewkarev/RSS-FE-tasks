const filtersElements = {
  brandFilter: {
    name: 'brand',
    parentNodeName: '.filters__item--brand',
    classNames: ['filters__brand', 'button'],
    attributes: ['type', 'button'],
    pointer: '&#9632;',
    elements: ['Samsung', 'Apple', 'Xiaomi'],
  },
  colorFilter: {
    name: 'color',
    parentNodeName: '.filters__color-container',
    classNames: [
      'filters__color',
      'button',
      'filters__color--white',
      'filters__color--yellow',
      'filters__color--red',
      'filters__color--green',
      'filters__color--blue',
      'filters__color--black',
    ],
    attributes: ['type', 'button'],
    elements: ['white', 'yellow', 'red', 'green', 'blue', 'black'],
  },
  storageFilter: {
    name: 'storage',
    parentNodeName: '.filters__item--storage-memory',
    classNames: ['filters__storage-memory', 'button'],
    attributes: ['type', 'button'],
    pointer: '&#9632;',
    elements: ['32', '64', '128', '256'],
  },
  popularityFilter: {
    name: 'popularity',
    parentNodeName: '.filters__item--popularity',
    classNames: ['filters__popularity', 'button'],
    attributes: ['type', 'button'],
    pointer: '&#9632;',
    elements: ['Best sellers only'],
  },
};

export default filtersElements;
