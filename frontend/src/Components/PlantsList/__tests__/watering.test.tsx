import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { Watering } from '../watering';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { useCountWatering } from '../hooks';

jest.mock('../hooks', () => {
  const helpers = jest.requireActual('../hooks');

  return {
    ...helpers,
    useCountWatering: jest.fn(),
  };
});

const mockUpdateLastWateringDate = jest.fn(() =>
  console.log('Last watering date updated')
);
const mockShowPlantsList = jest.fn(() => Promise.resolve('Plant list loaded'));

const setUp = (lastWateringDate: Date, wateringCycle: number) => {
  const wrapper = shallow(
    <Watering
        lastWateringDate={lastWateringDate}
        wateringCycle={wateringCycle}
        plantId={1}
        listId={1}
        updateLastWateringDate={mockUpdateLastWateringDate}
        showPlantsList={mockShowPlantsList}
    />
  );
  return wrapper;
};

const setUpMount = (
  lastWateringDate: Date,
  wateringCycle: number
): ReactWrapper => {
  (useCountWatering as jest.Mock).mockImplementation(() => {
    return { nextWateringIn: -1, currentDate: '2021-10-10' };
  });

  const wrapper = mount(
    <Watering
        lastWateringDate={lastWateringDate}
        wateringCycle={wateringCycle}
        plantId={1}
        listId={1}
        updateLastWateringDate={mockUpdateLastWateringDate}
        showPlantsList={mockShowPlantsList}
    />
  );
  return wrapper;
};

describe('Watering component', () => {
  it('Should render component with ok status when plant is watered', () => {
    (useCountWatering as jest.Mock).mockImplementation(() => {
      return { nextWateringIn: 3, currentDate: '2021-10-10' };
    });
    const wrapper: ShallowWrapper = setUp(new Date('2021-10-09'), 3);
    const component = findByDataTestAtrr(wrapper, 'WateringComponent');
    const status = component.find('.statusOk');
    const watering = component.find('.nextWateringContainer');
    expect(component.length).toBe(1);
    expect(status.text()).toBe('U mnie w porządku!');
    expect(watering.text()).toContain('dni');
    expect(component.find('button').length).toBe(0);
  });

  it('Should render /dzień/ string if next watering is in 1 day', () => {
    (useCountWatering as jest.Mock).mockImplementation(() => {
      return { nextWateringIn: 1, currentDate: '2021-10-10' };
    });
    const wrapper: ShallowWrapper = setUp(new Date('2021-10-09'), 3);
    const component = findByDataTestAtrr(wrapper, 'WateringComponent');
    const status = component.find('.statusOk');
    const watering = component.find('.nextWateringContainer');
    expect(component.length).toBe(1);
    expect(status.text()).toBe('U mnie w porządku!');
    expect(watering.text()).toContain('dzień');
    expect(component.find('button').length).toBe(0);
  });

  it('Should render component with nok status when plant is not watered', () => {
    (useCountWatering as jest.Mock).mockImplementation(() => {
      return { nextWateringIn: -1, currentDate: '2021-10-10' };
    });
    const wrapper: ShallowWrapper = setUp(new Date('2021-10-09'), 3);
    const component = findByDataTestAtrr(wrapper, 'WateringComponent');
    const status = component.find('.statusNok');
    expect(component.length).toBe(1);
    expect(status.text()).toBe('Potrzebuję wody!');
    expect(component.find('button').length).toBe(1);
  });
});

describe('Should handle update watering action', () => {
  const component = setUpMount(new Date('2021-10-09'), 3);

  it('Should emit callback on change event', async () => {
    const button = component.find('button').at(0);

    await act(async () => {
      button.simulate('click');
    });

    expect(mockUpdateLastWateringDate).toHaveBeenCalledTimes(1);
    expect(mockShowPlantsList).toHaveBeenCalledTimes(1);
  });
});
