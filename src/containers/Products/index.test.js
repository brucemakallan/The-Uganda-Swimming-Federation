import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { Products } from '.';
import { product } from '../../__mocks__';

describe('Products', () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      getAllProductsDispatch: jest.fn(),
      deleteProductDispatch: jest.fn(),
      getAllPropertiesDispatch: jest.fn(),
      products: [product],
    };
    wrapper = mount(
      <BrowserRouter>
        <Products {...props} />
      </BrowserRouter>
    );
  });

  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle saveID', () => {
    const instance = wrapper.find('Products').at(0).instance();
    const spy = jest.spyOn(instance, 'saveID');
    instance.forceUpdate();
    wrapper.update();
    wrapper.find('button#deleteBt').simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
