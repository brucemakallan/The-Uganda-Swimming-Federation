import React from 'react';
import { mount } from 'enzyme';
import ProductForm from './productForm';
import { product } from '../../__mocks__';

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
      addCloudinaryRawFile: jest.fn(),
      allEntities: [product],
      onTagAdd: jest.fn(),
      onTagDelete: jest.fn(),
      onTagDrag: jest.fn(),
    };
  });

  it('should render correctly', () => {
    const wrapper = mount(<ProductForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
