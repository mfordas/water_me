import { BrowserRouter } from 'react-router-dom';
import { shallow, mount, ShallowWrapper, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import PrivateRoute from '../../PrivateRoute';
import { PlantsListComponent } from '../index';

const mockGetPlantsListForUser = jest.fn(() =>
  console.log('Downloading plants lists...')
);

const initialState = {
  plantsListName: 'TestList',
  plantsLists: [
    { id: 1, userId: 1, name: 'List1' },
    { id: 2, userId: 2, name: 'List2' },
    { id: 3, userId: 3, name: 'List3' },
  ],
  userId: '1',
  plantsListDeleted: false,
  plants: [],
};

const setUp = () => {
  const wrapper = shallow(
    <PlantsListComponent
      getPlantsListsForUser={() => mockGetPlantsListForUser()}
      plantsListsData={initialState}
    />
  );
  return wrapper;
};

const setUpMount = (): ReactWrapper => {
  const wrapper = mount(
    <BrowserRouter>
      <PlantsListComponent
        getPlantsListsForUser={() => mockGetPlantsListForUser()}
        plantsListsData={initialState}
      />
    </BrowserRouter>
  );
  return wrapper;
};

describe('PlantsList component', () => {
  it('Should render without error', () => {
    const wrapper: ShallowWrapper = setUp();
    const privateRoutes = wrapper.find(PrivateRoute);
    expect(privateRoutes.length).toBe(3);
    expect(privateRoutes.at(0).prop('listIndex')).toBe(0);
    expect(privateRoutes.at(1).prop('listIndex')).toBe(1);
    expect(privateRoutes.at(2).prop('listIndex')).toBe(2);
  });
});

describe('Should load plants lists', () => {
  it('on component load', async () => {
    await act(async () => {
      setUpMount();
    });

    expect(mockGetPlantsListForUser.mock.calls.length).toBe(1);
  });
});
