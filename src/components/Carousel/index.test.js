import React from 'react';
import { mount } from 'enzyme';
import Carousel from '.';
import { product } from '../../__mocks__';

describe('Carousel', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Carousel id="sample-id" imageUrls={product.images} />);
    expect(wrapper).toMatchSnapshot();
  });
});
