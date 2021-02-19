import { shallow } from 'enzyme';
import React from 'react';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { Menu } from '../index';

describe('Menu Component', () => {
  it('Renders menu container without buttons', () => {
    const loginData = {
      loginData: {
        name: '',
        googleId: '',
        invalidData: false,
      },
      isLogged: false,
    };

    const wrapper = shallow(
      <Menu loginData={loginData} logout={() => jest.fn()} />
    );

    const menu = findByDataTestAtrr(wrapper, 'menuComponent');
    const menuHidden = findByDataTestAtrr(wrapper, 'noElementsInMenuComponent');

    expect(menu.length).toBe(1);
    expect(menuHidden.length).toBe(1);
  });

  it('Renders menu container with buttons', () => {
    const loginData = {
      loginData: {
        name: '',
        googleId: '',
        invalidData: false,
      },
      isLogged: true,
    };
    const wrapper = shallow(
      <Menu loginData={loginData} logout={() => jest.fn()} />
    );

    const menu = findByDataTestAtrr(wrapper, 'menuComponent');
    const menuButtons = findByDataTestAtrr(wrapper, 'menuComponentVisible');

    expect(menu.length).toBe(1);
    expect(menuButtons.length).toBe(1);
  });
});
