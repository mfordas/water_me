import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { AddPlantsList } from '../addPlantsList';
import { PlantsListsState } from '../../../redux_actions/plantsListsTypes';

const mockFunc = jest.fn();

const setUp = (initialState: PlantsListsState) => {
  const wrapper = mount(
    <AddPlantsList
      plantsListsData={initialState}
      addPlantsList={mockFunc}
      getPlantsListsForUser={mockFunc}
    />
  );
  return wrapper;
};

describe('Add plants list component', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    const initialState = {
      plantsListName: '',
      plantsLists: [],
      userId: '123456789',
      plantsListDeleted: false,
      plants: [],
    };
    wrapper = setUp(initialState);
  });

  it('Should render without error', () => {
    const component = findByDataTestAtrr(wrapper, 'addPlantListComponent');
    expect(component.length).toBe(1);
  });

  it('Should emit callback on click event', async () => {
    const component = findByDataTestAtrr(wrapper, 'addPlantsListButton');
    const input = findByDataTestAtrr(wrapper, 'inputAddPlantsList');

    const event = {
      target: { value: 'listname' },
    };
    input.simulate('change', event);

    await act(async () => {
      component.simulate('click');
    });

    const callback = mockFunc.mock.calls.length;
    expect(callback).toBe(2);
  });

  it('Should not emit callback on click event', async () => {
    const component = findByDataTestAtrr(wrapper, 'addPlantsListButton');
    const input = findByDataTestAtrr(wrapper, 'inputAddPlantsList');

    const event = {
      target: { value: '' },
    };
    input.simulate('change', event);

    await act(async () => {
      component.simulate('click');
    });

    const callback = mockFunc.mock.calls.length;
    expect(callback).toBe(0);
  });
});
