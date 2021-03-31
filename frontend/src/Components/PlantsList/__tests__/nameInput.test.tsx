import React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { act } from 'react-dom/test-utils';
import { NameInput } from '../nameInput';
import ErrorMessage from '../../ErrorMessage/errorMessage';

const mockSetName = jest.fn(() => console.log('Changing name...'));

const setUp = (formSubmitted: boolean, name: string) => {
  const wrapper = shallow(
    <NameInput
      formSubmitted={formSubmitted}
      name={name}
      setName={mockSetName}
    />
  );
  return wrapper;
};

const setUpMount = (formSubmitted: boolean, name: string): ReactWrapper => {
  const wrapper = mount(
    <NameInput
      formSubmitted={formSubmitted}
      name={name}
      setName={mockSetName}
    />
  );
  return wrapper;
};

describe('NameInput component', () => {
  it('Should render without error', () => {
    const wrapper: ShallowWrapper = setUp(false, '');
    const component = findByDataTestAtrr(wrapper, 'nameInput');
    expect(component.length).toBe(1);
  });
});

describe('Should handle input change', () => {
  it('Should show error if input is empty and form is submitted', () => {
    const component = setUpMount(true, '');
    const inputElement = component.find(ErrorMessage);

    expect(inputElement.prop('errorText')).toBe('Wpisz imię');
  });

  it('Should show error if input is shorter than 3 characters and form is submitted', () => {
    const component = setUpMount(true, 'abc');
    const inputElement = component.find(ErrorMessage);

    expect(inputElement.prop('errorText')).toBe(
      'Imię powinno być dłuższe niż 3 znaki'
    );
  });

  it('Should call set name if input is changing', () => {
    const component = setUpMount(false, '');
    const inputElement = component.find('input').at(0);

    act(() => inputElement.prop('onChange')({ target: { value: 'abcd' } }));

    expect(mockSetName).toHaveBeenCalledTimes(1);
  });
});
