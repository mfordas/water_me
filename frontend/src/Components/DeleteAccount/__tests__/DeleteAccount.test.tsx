import { BrowserRouter, Redirect } from 'react-router-dom';

import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { DeleteAccount } from '../DeleteAccount';
import { initialState } from '../../../redux_reducers/loginReducer';
import { LoginState } from '../../../redux_actions/loginTypes';

const mockFunc = jest.fn();

const setUp = (startState: LoginState = initialState) => {
    const wrapper = shallow(
        <DeleteAccount loginData={startState} deleteAccount={mockFunc} />
    );
    return wrapper;
};

const setUpMount = (startState: LoginState = initialState) => {
    const wrapper = mount(
        <BrowserRouter>
            <DeleteAccount loginData={startState} deleteAccount={mockFunc} />
        </BrowserRouter>
    );
    return wrapper;
};

describe('Google auth component', () => {
    const initialState = {
        loginData: {
            name: 'TestName',
            googleId: '123456789',
            invalidData: false,
        },
        isLogged: true,
        errorMessage: '',
    };

    const wrapper = setUp(initialState);

    it('should render without error', () => {
        const component = findByDataTestAtrr(wrapper, 'deleteAccountContainer');
        expect(component.length).toBe(1);
        expect(component.text()).toContain(initialState.loginData.name);
        expect(component.text()).toContain(initialState.loginData.googleId);
    });
});

describe('Should handle submit button', () => {
    const initialState = {
        loginData: {
            name: 'TestName',
            googleId: '123456789',
            invalidData: false,
        },
        isLogged: true,
        errorMessage: '',
    };

    const component = setUpMount(initialState);

    it('and should emit callback on click event', async () => {
        const deleteButton = findByDataTestAtrr(component, 'deleteAccountButton');
        await act(async () => {
            deleteButton.simulate('click');
        });

        expect(mockFunc).toHaveBeenCalled();
    });
});

describe('When account is deleted', () => {
    it('should redirect to main screen', () => {
        const initialState = {
            loginData: {
                name: '',
                googleId: '',
                invalidData: false,
            },
            isLogged: false,
            errorMessage: '',
        };

        const wrapper = setUp(initialState);

        expect(wrapper.find(Redirect).length).toBe(1);
        expect(wrapper.debug()).toContain('/');
    });
});
