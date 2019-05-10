import React from 'react';
import { mount } from 'enzyme';
import ProductForm from './productForm';
import property, { product, propertyCondition } from '../../__mocks__';

describe('ProductForm', () => {
  let props;

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      onArrayChange: jest.fn(),
      removeRow: jest.fn(),
      addRow: jest.fn(),
      addCloudinaryImage: jest.fn(),
      onSubmit: jest.fn(),
      entity: product,
      properties: [property, propertyCondition],
    };
  });

  it('should render correctly', () => {
    const wrapper = mount(<ProductForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
