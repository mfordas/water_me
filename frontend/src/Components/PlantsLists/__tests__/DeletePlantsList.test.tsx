import { shallow, ShallowWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { DeletePlantsList } from '../deletePlantsList';
import { PlantsListsState } from '../../../redux_actions/plantsListsTypes';

const mockFunc = jest.fn();

const setUp = (initialState: PlantsListsState) => {
  const wrapper = shallow(
    <DeletePlantsList
      plantsListsData={initialState}
      getPlantsListsForUser={mockFunc}
      deletePlantsList={mockFunc}
      plantsListId={1}
    />
  );
  return wrapper;
};

describe('Delete plants list component', () => {
  let wrapper: ShallowWrapper;

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
    const component = findByDataTestAtrr(wrapper, 'deletePlantListComponent');
    expect(component.length).toBe(1);
  });

  it('Should emit callback on click event', async () => {
    const component = findByDataTestAtrr(wrapper, 'deletePlantListComponent');

    const event = {
      preventDefault() {},
      target: { value: 'the-value' },
    };

    await act(async () => {
      component.simulate('click', event);
    });
    const callback = mockFunc.mock.calls.length;
    expect(callback).toBe(2);
  });
});
