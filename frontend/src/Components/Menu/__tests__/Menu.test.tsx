import { BrowserRouter } from 'react-router-dom';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { Menu } from '../menu';

const mockFunc = jest.fn();

describe('Menu Component', () => {
    it('renders without buttons', () => {
        const loginData = {
            loginData: {
                name: '',
                googleId: '',
                invalidData: false,
            },
            isLogged: false,
            errorMessage: '',
        };

        const wrapper: ShallowWrapper = shallow(
            <Menu loginData={loginData} logout={() => mockFunc()} />
        );

        const menu = findByDataTestAtrr(wrapper, 'menuComponent');
        const menuHidden = findByDataTestAtrr(wrapper, 'menuComponentVisible');

        expect(menu.length).toBe(1);
        expect(menuHidden.length).toBe(0);
    });

    it('renders with buttons', () => {
        const loginData = {
            loginData: {
                name: '',
                googleId: '',
                invalidData: false,
            },
            isLogged: true,
            errorMessage: '',
        };
        const wrapper: ShallowWrapper = shallow(
            <Menu loginData={loginData} logout={() => mockFunc()} />
        );

        const menu = findByDataTestAtrr(wrapper, 'menuComponent');
        const menuButtons = findByDataTestAtrr(wrapper, 'menuComponentVisible');

        expect(menu.length).toBe(1);
        expect(menuButtons.length).toBe(1);
    });

    it('triggers logout action when button is clicked', async () => {
        const loginData = {
            loginData: {
                name: '',
                googleId: '',
                invalidData: false,
            },
            isLogged: true,
            errorMessage: '',
        };
        
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
