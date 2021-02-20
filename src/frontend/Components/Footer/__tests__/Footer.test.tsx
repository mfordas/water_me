import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import FooterComponent from '../index';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';

const setUp = () => {
  const component = shallow(<FooterComponent />);
  return component;
};

describe('FooterComponent component', () => {
  let component: ShallowWrapper;
  beforeEach(() => {
    component = setUp();
  });

  it('should render without errors', () => {
    const wrapper = findByDataTestAtrr(component.dive(), 'footerComponent');

    expect(wrapper.length).toBe(1);
  });

  it('Should render a link', () => {
    const wrapper = findByDataTestAtrr(component.dive(), 'linkInFooter');

    expect(wrapper.length).toBe(1);
  });
});
