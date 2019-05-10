import productsReducer from './productsReducer';
import types from '../actions';
import { product } from '../__mocks__';
import { serverResponses } from '../utils';

describe('Products Reducer', () => {
  let initialState;
  let initialStateWithProduct;

  beforeEach(() => {
    initialState = {
      products: [],
      product: {},
    };
    initialStateWithProduct = {
      ...initialState,
      products: [product],
    };
  });

  it('should return default state if improper action is provided', () => {
    const action = { type: 'value', payload: 'value' };
    expect(productsReducer(initialState, action))
      .toEqual(initialState);
  });

  it('should handle GET_ALL_PRODUCTS', () => {
    const action = {
      type: types.GET_ALL_PRODUCTS,
      payload: [product],
    };
    const expectedState = {
      ...initialState,
      products: [product],
    };
    expect(productsReducer(initialState, action))
      .toEqual(expectedState);
  });

  it('should handle POST_NEW_PRODUCT', () => {
    const action = {
      type: types.POST_NEW_PRODUCT,
      payload: product,
    };
    const expectedState = {
      ...initialState,
      product,
    };
    expect(productsReducer(initialState, action))
      .toEqual(expectedState);
  });

  it('should handle DELETE_PRODUCT', () => {
    const action = {
      type: types.DELETE_PRODUCT,
      payload: product,
    };
    const expectedState = {
      products: [],
      product: {},
    };
    expect(productsReducer(initialStateWithProduct, action))
      .toEqual(expectedState);
  });

  it('should handle ERROR', () => {
    const action = {
      type: types.ERROR,
      payload: 'sample error',
    };
    const expectedState = {
      products: [],
      product: {},
    };
    expect(productsReducer(initialState, action))
      .toEqual(expectedState);
  });

  it('should handle ERROR for duplicate value', () => {
    const action = {
      type: types.ERROR,
      payload: serverResponses.DUPLICATE,
    };
    const expectedState = {
      products: [],
      product: {},
    };
    expect(productsReducer(initialState, action))
      .toEqual(expectedState);
  });

  it('should handle SUCCESS', () => {
    const action = {
      type: types.SUCCESS,
      payload: 'success message',
    };
    const expectedState = {
      products: [],
      product: {},
    };
    expect(productsReducer(initialState, action))
      .toEqual(expectedState);
  });
});
