import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from '.';

describe('App', () => {
  let store;

  beforeEach(() => {
    const createStore = configureMockStore([thunk]);
    const initialState = {};
    store = createStore(initialState);
  });

  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
