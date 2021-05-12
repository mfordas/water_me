import { Link } from 'react-router-dom';

import { shallow, ShallowWrapper } from 'enzyme';

import { Footer } from '../footer';
import { LoginState } from '../../../redux_actions/loginTypes';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';

const testLoginDataWhenLogged: LoginState = {
  loginData: {
    name: 'TestName',
    googleId: '123456789',
    invalidData: false,
  },
  isLogged: true,
  errorMessage: '',
};

const testLoginDataWhenNotLogged: LoginState = {
  loginData: {
    name: 'TestName',
    googleId: '123456789',
    invalidData: false,
  },
  isLogged: false,
  errorMessage: '',
};

const setUp = (loginData: LoginState) => {
  const component = shallow(<Footer loginData={loginData} />);
  return component;
};

describe('Footer', () => {
  let component: ShallowWrapper;
  afterEach(() => {
    component.unmount();
  });

  it('should render without errors', () => {
    component = setUp(testLoginDataWhenNotLogged);
    const wrapper = findByDataTestAtrr(component, 'footerComponent');
    const linkToWebsite = findByDataTestAtrr(component, 'linkInFooter');

    const personalDataLink = component.find(Link);

    expect(linkToWebsite.length).toBe(1);
    expect(linkToWebsite.text()).toContain('Mateusz Fordas');
    expect(wrapper.length).toBe(1);
    expect(personalDataLink.length).toBe(0);
  });

  it('should render link to personal data screen when user is logged in', () => {
    component = setUp(testLoginDataWhenLogged);
    const linkToWebsite = findByDataTestAtrr(component, 'linkInFooter');

    const personalDataLink = component.find(Link);

    expect(linkToWebsite.length).toBe(1);
    expect(linkToWebsite.text()).toContain('Mateusz Fordas');
    expect(personalDataLink.length).toBe(1);
    expect(personalDataLink.text()).toContain('Moje dane');
  });
});
