import React from 'react';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { act } from 'react-dom/test-utils';
import { DateInput } from '../dateInput';

const mockSetStartDate = jest.fn(() => console.log('Changing date...'));

const setUp = () => {
  const wrapper = shallow(
    <DateInput startDate={'01-01-2021'} setStartDate={() => mockSetStartDate} />
  );
  return wrapper;
};

const setUpMount = (): ReactWrapper => {
  const wrapper = mount(
    <DateInput startDate={'01-01-2021'} setStartDate={mockSetStartDate} />
  );
  return wrapper;
};

describe('DateInput component', () => {
  it('Should render without error', () => {
    const wrapper: ShallowWrapper = setUp();
    const component = findByDataTestAtrr(wrapper, 'DateInput');
    expect(component.length).toBe(1);
  });
});

describe('Should handle input change', () => {
  const component = setUpMount();

  it('Should emit callback on change event', () => {
    const inputElement = component.find('input').at(0);

    act(() =>
      inputElement.prop('onChange')({ target: { value: '02.03.2021' } })
    );

    expect(mockSetStartDate).toHaveBeenCalledTimes(1);
  });
});
