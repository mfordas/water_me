import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { AddPlant } from '../addPlant';
import { PlantsState } from '../../../redux_actions/plantsTypes';
import { Provider } from 'react-redux';
import { store } from '../../../redux_store/reduxStore';

const mockFunc = jest.fn();

const setUp = (initialState: PlantsState) => {
  const wrapper = mount(
    <Provider store={store}>
      <BrowserRouter>
        <AddPlant
          listId={1}
          addPlantToList={mockFunc}
          uploadPlantImage={mockFunc}
          plantsData={initialState}
          showPlantsList={mockFunc}
        />
      </BrowserRouter>
    </Provider>
  );
  return wrapper;
};

describe('Add plants list component', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    const initialState = {
      plantData: {
        id: 1,
        name: 'abc',
        plantsListId: 1,
        wateringCycle: 1,
        pictureUrl: 'abc',
        wateringCycleBeginingData: new Date(),
        lastTimeWatered: new Date(),
      },
      plantDeleted: false,
      wateringDateUpdated: false,
      imageName: '',
    };
    wrapper = setUp(initialState);
  });

  it('Should render without error', () => {
    const component = findByDataTestAtrr(wrapper, 'addPlantComponent');

    expect(component.length).toBe(1);
  });
});
