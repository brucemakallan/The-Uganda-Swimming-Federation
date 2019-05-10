import React from 'react';
import { mount } from 'enzyme';
import Modal from '.';

describe('Modal', () => {
  const props = {
    title: 'test',
    body: 'test',
    primaryAction: 'test',
    secondaryAction: 'test',
    id: 'abc123',
    onClick: jest.fn(),
    show: true,
    hideModal: jest.fn(),
  };

  it('should render correctly', () => {
    const wrapper = mount(<Modal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
