import React from 'react';
import { shallow } from 'enzyme';
import Logo from '../logo';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';

const setUp = (props = {}) => {
  const component = shallow(<Logo {...props} />);
  return component;
};

describe('Logo component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('should render without errors', () => {
    const wrapper = findByDataTestAtrr(component, 'logoComponent');

    expect(wrapper.length).toBe(1);
  });

  it('Should render a logo', () => {
    const wrapper = findByDataTestAtrr(component, 'logoSVG');

    expect(wrapper.length).toBe(1);
  });
});
