import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import ReadProducts from '.';
import { product } from '../../__mocks__';

describe('Products', () => {
  const props = {
    data: [product],
    saveID: jest.fn(),
  };
  it('should render correctly', () => {
    const wrapper = mount(<BrowserRouter><ReadProducts {...props} /></BrowserRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});
