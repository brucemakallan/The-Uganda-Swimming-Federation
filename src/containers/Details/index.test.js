import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Details from '.';
import { product } from '../../__mocks__';

describe('Product Details', () => {
  let props;
  let store;

  beforeEach(() => {
    props = {
      match: {
        params: {
          id: product._id,
        },
      },
      products: [product],
      history: {
        goBack: jest.fn(),
      },
    };
    const initialState = {
      productsReducer: { products: [product] },
    };
    const createStore = configureMockStore([thunk]);
    store = createStore(initialState);
  });

  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter><Details {...props} /></BrowserRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
