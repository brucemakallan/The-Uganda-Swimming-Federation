import React from 'react';
import { mount } from 'enzyme';
import DashboardHome from '.';

describe('DashboardHome', () => {
  it('should render correctly', () => {
    const wrapper = mount(<DashboardHome />);
    expect(wrapper).toMatchSnapshot();
  });
});
