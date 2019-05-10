import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import SideBar from '.';

describe('SideBar', () => {
  let props;

  beforeEach(() => {
    props = {
      history: { location: { pathname: '/dashboard' } },
    };
  });

  it('should render correctly', () => {
    const wrapper = mount(<BrowserRouter><SideBar {...props} /></BrowserRouter>);
    expect(wrapper).toMatchSnapshot();
  });
});
