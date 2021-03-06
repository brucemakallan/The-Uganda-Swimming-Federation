import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import types from '.';
import { product, productInput } from '../__mocks__';
import { messages } from '../utils';
import getAllProducts, { postProduct, editProduct, deleteProduct } from './productsActions';

describe('Actions', () => {
  let mockUrl;
  let store;
  let error;

  beforeEach(() => {
    moxios.install();
    mockUrl = 'https://api.com/entities';
    const createMockStore = configureMockStore([thunk]);
    const initialState = {};
    store = createMockStore(initialState);
    error = { response: { data: { message: 'sample error' } } };
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should return a list products', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [product],
      });
    });
    store.dispatch(getAllProducts(mockUrl)).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.SHOW_PAGE_LOADER, payload: true },
        { type: types.GET_ALL_PRODUCTS, payload: [product] },
        { type: types.SHOW_PAGE_LOADER, payload: false },
      ]);
    });
  });
  it('should handle exceptions when fetching products', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: error.response.data,
      });
    });
    store.dispatch(getAllProducts(mockUrl)).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.SHOW_PAGE_LOADER, payload: true },
        { type: types.SHOW_PAGE_LOADER, payload: false },
        { type: types.ERROR, payload: error.response.data.message },
      ]);
    });
  });

  it('should post a product', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: product,
      });
    });
    const history = {
      goBack: jest.fn(),
    };
    const createAnotherProduct = false;
    store.dispatch(postProduct(mockUrl, productInput, history, createAnotherProduct))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.SHOW_PAGE_LOADER, payload: true },
          { type: types.POST_NEW_PRODUCT, payload: product },
          { type: types.SUCCESS, payload: messages.SUCCESS },
          { type: types.SHOW_PAGE_LOADER, payload: false },
        ]);
      });
  });
  it('should post a product with the "Create Another" option', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: product,
      });
    });
    const history = {
      goBack: jest.fn(),
    };
    const createAnotherProduct = true;
    store.dispatch(postProduct(mockUrl, productInput, history, createAnotherProduct))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.SHOW_PAGE_LOADER, payload: true },
          { type: types.POST_NEW_PRODUCT, payload: product },
          { type: types.SUCCESS, payload: messages.SUCCESS },
          { type: types.SHOW_PAGE_LOADER, payload: false },
        ]);
      });
  });
  it('should handle exceptions when posting a product', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: error.response.data,
      });
    });
    const history = {
      goBack: jest.fn(),
    };
    const createAnotherProduct = false;
    store.dispatch(postProduct(mockUrl, productInput, history, createAnotherProduct))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.SHOW_PAGE_LOADER, payload: true },
          { type: types.SHOW_PAGE_LOADER, payload: false },
          { type: types.ERROR, payload: error.response.data.message },
        ]);
      });
  });

  it('should edit a product', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: product,
      });
    });
    const history = {
      goBack: jest.fn(),
    };
    store.dispatch(editProduct(mockUrl, productInput, history)).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.SHOW_PAGE_LOADER, payload: true },
        { type: types.POST_NEW_PRODUCT, payload: product },
        { type: types.SUCCESS, payload: messages.SUCCESS },
        { type: types.SHOW_PAGE_LOADER, payload: false },
      ]);
    });
  });
  it('should handle exceptions when editing a product', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: error.response.data,
      });
    });
    const history = {
      goBack: jest.fn(),
    };
    store.dispatch(editProduct(mockUrl, productInput, history))
      .then(() => {
        expect(store.getActions()).toEqual([
          { type: types.SHOW_PAGE_LOADER, payload: true },
          { type: types.SHOW_PAGE_LOADER, payload: false },
          { type: types.ERROR, payload: error.response.data.message },
        ]);
      });
  });

  it('should delete a product', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: product,
      });
    });
    store.dispatch(deleteProduct(mockUrl)).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.DELETE_PRODUCT, payload: product },
      ]);
    });
  });
  it('should handle exceptions when deleting a product', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: error.response.data,
      });
    });
    store.dispatch(deleteProduct(mockUrl)).then(() => {
      expect(store.getActions()).toEqual([
        { type: types.ERROR, payload: error.response.data.message },
      ]);
    });
  });
});
