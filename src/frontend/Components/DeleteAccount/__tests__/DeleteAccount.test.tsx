import React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { DeleteAccount } from '../DeleteAccount';
import { initialState } from '../../../redux_reducers/loginReducer';
import { LoginState } from '../../../redux_actions/loginTypes';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

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
  let wrapper: ShallowWrapper;

  const initialState = {
    loginData: {
      name: 'TestName',
      googleId: '123456789',
      invalidData: false,
    },
    isLogged: true,
  };

  wrapper = setUp(initialState);

  it('Should render without error', () => {
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
  };

  const component = setUpMount(initialState);

  it('Should emit callback on click event', async () => {
    const deleteButton = findByDataTestAtrr(component, 'deleteAccountButton');
    await act(async () => {
      deleteButton.simulate('click');
    });

    expect(mockFunc).toHaveBeenCalled();
  });
});

describe('When account is deleted', () => {
  it('Should redirect to main screen', () => {
    const initialState = {
      loginData: {
        name: '',
        googleId: '',
        invalidData: false,
      },
      isLogged: false,
    };

    const wrapper = setUp(initialState);

    expect(wrapper.find(Redirect).length).toBe(1);
    expect(wrapper.debug()).toContain('/');
  });
});
