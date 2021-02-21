import React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { GoogleAuth } from '../googleAuth';
import { initialState } from '../../../redux_reducers/loginReducer';
import { LoginState } from '../../../redux_actions/loginTypes';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { makeAuth } from '../helpers';

jest.mock('../helpers', () => {
  const helpers = jest.requireActual('../helpers');

  return {
    ...helpers,
    makeAuth: jest.fn(),
  };
});

jest.mock('../hooks', () => {
  const hooks = jest.requireActual('../hooks');

  return {
    ...hooks,
    useHandleGoogleApi: jest.fn(),
  };
});

const mockFunc = jest.fn();

const setUp = (startState: LoginState = initialState) => {
  const wrapper = shallow(
    <GoogleAuth loginData={startState} loginExternal={mockFunc} />
  );
  return wrapper;
};

const setUpMount = (startState: LoginState = initialState) => {
  const wrapper = mount(
    <BrowserRouter>
      <GoogleAuth loginData={startState} loginExternal={mockFunc} />
    </BrowserRouter>
  );
  return wrapper;
};

describe('Google auth component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    const initialState = {
      loginData: {
        name: '',
        googleId: '',
        invalidData: false,
      },
      isLogged: false,
    };

    wrapper = setUp(initialState);
  });

  it('Should render without error', () => {
    const component = findByDataTestAtrr(wrapper, 'googleAuthComponent');
    expect(component.length).toBe(1);
  });
});

describe('Should handle submit Google login button', () => {
  const component = setUpMount(initialState);

  it('Should emit callback on click event', async () => {
    (makeAuth as jest.Mock).mockImplementation(() =>
      console.log('Making auth')
    );
    await act(async () => {
      component.simulate('click');
    });

    expect(makeAuth).toHaveBeenCalled();
  });
});

describe('When logged in', () => {
  it('Should redirect to plants lists', () => {
    const initialState = {
      loginData: {
        name: '',
        googleId: '',
        invalidData: false,
      },
      isLogged: true,
    };

    const wrapper = setUp(initialState);

    expect(wrapper.find(Redirect).length).toBe(1);
    expect(wrapper.debug()).toContain('/plants');
  });
});
