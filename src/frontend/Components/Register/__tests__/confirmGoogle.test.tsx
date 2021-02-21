import React from 'react';
import { ConfirmGoogle } from '../confirmGoogle';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { initialState } from '../../../redux_reducers/registerReducer';
import { RegisterState } from '../../../redux_actions/registerTypes';
import { BrowserRouter, Link } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const mockFunc = jest.fn();

const setUp = (startState: RegisterState = initialState) => {
  const wrapper = shallow(
    <ConfirmGoogle registerData={startState} resetRegisterState={mockFunc} />
  );
  return wrapper;
};

const setUpMount = (startState: RegisterState = initialState) => {
  const wrapper = mount(
    <BrowserRouter>
      <ConfirmGoogle registerData={startState} resetRegisterState={mockFunc} />
    </BrowserRouter>
  );
  return wrapper;
};

describe('Render', () => {
  it('Should render without errors', () => {
    const component = setUp();

    const paragraphs = component.find('p').getElements();

    expect(paragraphs[0].props.children).toBe('Konto założone!');
    expect(paragraphs[1].props.children).toBe('Możesz teraz się zalogować.');
    expect(component.find(Link).length).toBe(1);
  });
});

describe('Should handle submit Google register button', () => {
  const component = setUpMount(initialState);

  it('Should emit callback on click event', async () => {
    await act(async () => {
      component.find(Link).simulate('click');
    });

    expect(mockFunc).toBeCalledTimes(1);
  });
});
