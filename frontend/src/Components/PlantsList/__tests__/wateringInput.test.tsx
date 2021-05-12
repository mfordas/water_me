import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { WateringInput } from '../wateringInput';
import { ErrorMessage } from '../../ErrorMessage/errorMessage';

const mockSetWateringCycle = jest.fn(() => console.log('Changing watering...'));

const setUp = (formSubmitted: boolean, wateringCycle: number) => {
  const wrapper = shallow(
    <WateringInput
        formSubmitted={formSubmitted}
        wateringCycle={wateringCycle}
        setWateringCycle={mockSetWateringCycle}
    />
  );
  return wrapper;
};

const setUpMount = (
  formSubmitted: boolean,
  wateringCycle: number
): ReactWrapper => {
  const wrapper = mount(
    <WateringInput
        formSubmitted={formSubmitted}
        wateringCycle={wateringCycle}
        setWateringCycle={mockSetWateringCycle}
    />
  );
  return wrapper;
};

describe('DateInput component', () => {
  it('Should render without error', () => {
    const wrapper: ShallowWrapper = setUp(false, 0);
    const component = findByDataTestAtrr(wrapper, 'WateringInput');
    expect(component.length).toBe(1);
  });
});

describe('Should handle input change', () => {
  it('Should show /dzień/ string if watering is equal to 1', () => {
    const component = setUpMount(false, 1);

    const inputElement = component.find('input').at(0);

    expect(inputElement.prop('value')).toBe(1);
    expect(component.text()).toContain('dzień');
  });

  it('Should show /dni/ string if watering is greater than 1', () => {
    const component = setUpMount(false, 3);

    const inputElement = component.find('input').at(0);

    expect(inputElement.prop('value')).toBe(3);
    expect(component.text()).toContain('dni');
  });

  it('Should show error if form is submitted and watering cycle equals 0', () => {
    const component = setUpMount(true, 0);

    const errorMessage = component.find(ErrorMessage);

    expect(errorMessage.prop('errorText')).toBe(
      'Wpisz częstotliwość podlewania'
    );
  });

  it('Should emit callback on change event', () => {
    const component = setUpMount(true, 0);

    const inputElement = component.find('input').at(0);

    act(() => inputElement.prop('onChange')({ target: { value: 3 } }));

    expect(mockSetWateringCycle.mock.calls.length).toBe(1);
  });
});
