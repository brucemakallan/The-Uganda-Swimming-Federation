import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Dashboard from '.';

describe('Dashboard', () => {
  let createMockStore;
  let initialState;

  beforeEach(() => {
    createMockStore = configureMockStore([thunk]);
    initialState = {
      loaderReducer: { showLoader: false },
    };
  });

  it('should render correctly with no loader', () => {
    const store = createMockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter><Dashboard /></BrowserRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with a loader', () => {
    const store = createMockStore({ ...initialState, loaderReducer: { showLoader: true } });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter><Dashboard /></BrowserRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
