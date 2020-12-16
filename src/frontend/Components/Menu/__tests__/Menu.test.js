import { shallow } from 'enzyme';
import React from 'react';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { Menu } from '../index';


describe('Menu Component', () => {

    it('Renders menu container without buttons', () => {
        const props = {
            loginData: {
                isLogged: false
            }

        }
        const wrapper = shallow(<Menu {...props}/>);
        
        const menu = findByDataTestAtrr(wrapper, 'menuComponent');
        const menuHidden = findByDataTestAtrr(wrapper, 'noElementsInMenuComponent');

        expect(menu.length).toBe(1);
        expect(menuHidden.length).toBe(1);

    })

    it('Renders menu container with buttons', () => {
        const props = {
            loginData: {
                isLogged: true
            }

        }
        const wrapper = shallow(<Menu {...props}/>);

        const menu = findByDataTestAtrr(wrapper, 'menuComponent');
        const menuButtons = findByDataTestAtrr(wrapper, 'menuComponentVisible');

        expect(menu.length).toBe(1);
        expect(menuButtons.length).toBe(1);

    })

})