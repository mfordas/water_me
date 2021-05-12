import { BrowserRouter } from 'react-router-dom';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import { Provider } from 'react-redux';

import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { ShowPlantsLists } from '../showPlantsLists';
import { PlantsListsState } from '../../../redux_actions/plantsListsTypes';
import { store } from '../../../redux_store/reduxStore';

const mockFunc = jest.fn();

const setUp = (initialState: PlantsListsState) => {
  const wrapper = shallow(
    <ShowPlantsLists
      plantsListsData={initialState}
      getPlantsListsForUser={mockFunc}
    />
  );
  return wrapper;
};

const mockFuncMount = jest.fn();

const setUpMount = (initialState: PlantsListsState) => {
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <ShowPlantsLists
          plantsListsData={initialState}
          getPlantsListsForUser={mockFuncMount}
        />
      </BrowserRouter>
    </Provider>
  );
  return wrapper;
};

describe('ShowPlants list component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    const initialState = {
      plantsListName: '',
      plantsLists: [
        {
          id: 1,
          name: 'list1',
          userId: 1,
        },
        {
          id: 2,
          name: 'list2',
          userId: 1,
        },
        {
          id: 3,
          name: 'list3',
          userId: 1,
        },
      ],
      userId: '123456789',
      plantsListDeleted: false,
      plants: [],
    };

    wrapper = setUp(initialState);
  });

  it('Should render without error', () => {
    const component = findByDataTestAtrr(wrapper, 'showPlantsListsComponent');
    const plantsListContainers = findByDataTestAtrr(
      wrapper,
      'plantsListContainer'
    );

    expect(component.length).toBe(1);
    expect(plantsListContainers.length).toBe(3);
  });
});

describe('ShowPlants list component mounted', () => {
  beforeEach(() => {
    const initialState = {
      plantsListName: '',
      plantsLists: [
        {
          id: 1,
          name: 'list1',
          userId: 1,
        },
        {
          id: 2,
          name: 'list2',
          userId: 1,
        },
        {
          id: 3,
          name: 'list3',
          userId: 1,
        },
      ],
      userId: '123456789',
      plantsListDeleted: false,
      plants: [],
    };

    setUpMount(initialState);
  });

  it('Should trigger loading plants lists for user', () => {
    expect(mockFuncMount).toHaveBeenCalledTimes(1);
  });
});
