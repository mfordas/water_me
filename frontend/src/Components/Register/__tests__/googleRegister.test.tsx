import { shallow, mount, ShallowWrapper } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { GoogleRegister } from '../googleRegister';
import { initialState } from '../../../redux_reducers/registerReducer';
import { RegisterState } from '../../../redux_actions/registerTypes';
import { makeAuth } from '../../Login/helpers';
import { ConfirmGoogleConnected } from '../confirmGoogle';

jest.mock('../../Login/helpers', () => {
  const helpers = jest.requireActual('../../Login/helpers');

  return {
    ...helpers,
    makeAuth: jest.fn(),
  };
});

jest.mock('../../Login/hooks', () => {
  const hooks = jest.requireActual('../../Login/hooks');

  return {
    ...hooks,
    useHandleGoogleApi: jest.fn(),
  };
});

const mockFunc = jest.fn();

const setUp = (startState: RegisterState = initialState) => {
  const wrapper = shallow(
    <GoogleRegister registerData={startState} postGoogleUser={mockFunc} />
  );
  return wrapper;
};

const setUpMount = (startState: RegisterState = initialState) => {
  const wrapper = mount(
    <BrowserRouter>
      <GoogleRegister registerData={startState} postGoogleUser={mockFunc} />
    </BrowserRouter>
  );
  return wrapper;
};

describe('Google register component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    const initialState: RegisterState = {
      invalidData: false,
      confirm: false,
      googleUser: false,
    };

    wrapper = setUp(initialState);
  });

  it('Should render without error', () => {
    const component = findByDataTestAtrr(wrapper, 'registerComponent');
    expect(component.length).toBe(1);
  });
});

describe('Should handle submit Google register button', () => {
  const component = setUpMount(initialState);

  it('Should emit callback on click event', async () => {
    (makeAuth as jest.Mock).mockImplementation(() =>
      console.log('Register user')
    );
    await act(async () => {
      component.find('button').simulate('click');
    });

    expect(makeAuth).toHaveBeenCalled();
  });
});

describe('When registered', () => {
  it('Should show confirm component', () => {
    const initialState: RegisterState = {
      invalidData: false,
      confirm: true,
      googleUser: false,
    };

    const wrapper = setUp(initialState);

    expect(wrapper.find(ConfirmGoogleConnected).length).toBe(1);
  });
});
