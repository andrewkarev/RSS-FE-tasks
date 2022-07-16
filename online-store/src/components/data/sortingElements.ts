const sortingElements = [
  {
    classes: ['sorting__option', 'sorting__option--name-ascending'],
    content: 'name A-Z',
    sortID: 'ascending',
  },
  {
    classes: ['sorting__option', 'sorting__option--name-descending'],
    content: 'name Z-A',
    sortID: 'descending',
  },
  {
    classes: ['sorting__option', 'sorting__option--release-newwest'],
    content: 'release year (newest first)',
    sortID: 'newest',
  },
  {
    classes: ['sorting__option', 'sorting__option--release-oldest'],
    content: 'release year (oldest first)',
    sortID: 'oldest',
  },
  {
    classes: ['sorting__option', 'sorting__option--quantity-most'],
    content: 'quantity in stock (most)',
    sortID: 'most',
  },
  {
    classes: ['sorting__option', 'sorting__option--quantity-least'],
    content: 'quantity in stock (least)',
    sortID: 'least',
  },
];

export default sortingElements;
