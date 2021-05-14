import { BrowserRouter } from 'react-router-dom';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

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

        const wrapper: ShallowWrapper = shallow(
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
        const wrapper: ShallowWrapper = shallow(
            <Menu loginData={loginData} logout={() => jest.fn()} />
        );

        const menu = findByDataTestAtrr(wrapper, 'menuComponent');
        const menuButtons = findByDataTestAtrr(wrapper, 'menuComponentVisible');

        expect(menu.length).toBe(1);
        expect(menuButtons.length).toBe(1);
    });

    it('Triggers logout action when button is clicked', async () => {
        const loginData = {
            loginData: {
                name: '',
                googleId: '',
                invalidData: false,
            },
            isLogged: true,
        };

        const mockFunc = jest.fn();
        const wrapper: ReactWrapper = mount(
            <BrowserRouter>
                <Menu loginData={loginData} logout={() => mockFunc()} />
            </BrowserRouter>
        );

        await act(async () => {
            wrapper.find('button').simulate('click');
        });

        expect(mockFunc).toBeCalled();
    });
});
