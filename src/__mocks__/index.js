export const productInput = {
  heading1: 'test1',
  heading2: 'test2',
  heading3: 'test3',
  heading4: 'test4',
  heading5: 'test5',
  heading6: 'test6',
  body: 'test',
  dateIn: '124231221',
  dateOut: '124231222',
  parent: '312313432223',
  category: 'test',
  images: [
    'https://iviidev.info/downloads/images/sample.jpg',
  ],
  files: [
    {
      title: 'sample file',
      url: 'https://iviidev.info/downloads/files/sample.pdf',
    },
  ],
  array: [],
};

export const product = {
  ...productInput,
  _id: '5c9fdcf69c5e1a0d891d506e',
  dateCreated: '1553980662739',
  __v: 0,
};

export const mockState = {
  loaderReducer: { showLoader: false },
  adminReducer: { admin: {} },
  productsReducer: {
    products: [product],
    product,
  },
};

export default product;
