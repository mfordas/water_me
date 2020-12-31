import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../footer';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';

const setUp = (props = {}) => {
  const component = shallow(<Footer {...props} />);
  return component;
};

describe('Footer component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('should render without errors', () => {
    const wrapper = findByDataTestAtrr(component, 'footerComponent');

    expect(wrapper.length).toBe(1);
  });

  it('Should render a link', () => {
    const wrapper = findByDataTestAtrr(component, 'linkInFooter');

    expect(wrapper.length).toBe(1);
  });
});
