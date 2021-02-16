import {
  addPlantsListType,
  deletePlantsListType,
  getPlantsListsType,
  showPlantsListType,
} from '../../redux_actions/plantsListsTypes';
import plantsListsReducer, { initialState } from '../plantsListsReducer';

describe('Register Reducer', () => {
  it('Should return default state', () => {
    const newState = plantsListsReducer(undefined, {
      type: addPlantsListType,
      ...initialState,
    });

    expect(newState).toEqual({
      plantsListName: '',
      plantsLists: [],
      userId: localStorage.getItem('id'),
      plantsListDeleted: false,
      plants: [],
    });
  });

  it('Should return new state if receiving type add plants list', () => {
    const newPlantData = {
      plantsListName: 'XYZ',
      plantsLists: [],
      userId: localStorage.getItem('id'),
      plantsListDeleted: false,
      plants: [],
    };

    const newState = plantsListsReducer(undefined, {
      type: addPlantsListType,
      ...newPlantData,
    });

    expect(newPlantData).toEqual(newState);
  });

  it('Should return new state if receiving type get plants lists', () => {
    const newPlantData = {
      plantsListName: '',
      plantsLists: [
        {
          id: 1,
          name: 'Dom',
          userId: 2,
        },
        {
          id: 2,
          name: 'Praca',
          userId: 2,
        },
      ],
      userId: localStorage.getItem('id'),
      plantsListDeleted: false,
      plants: [],
    };

    const newState = plantsListsReducer(undefined, {
      type: getPlantsListsType,
      ...newPlantData,
    });

    expect(newPlantData).toEqual(newState);
  });

  it('Should return new state if receiving type delete plants list', () => {
    const newPlantData = {
      plantsListName: '',
      plantsLists: [],
      userId: localStorage.getItem('id'),
      plantsListDeleted: true,
      plants: [],
    };

    const newState = plantsListsReducer(undefined, {
      type: deletePlantsListType,
      ...newPlantData,
    });

    expect(newPlantData).toEqual(newState);
  });

  it('Should return new state if receiving type show plants list', () => {
    const newPlantData = {
      plantsListName: '',
      plantsLists: [],
      userId: localStorage.getItem('id'),
      plantsListDeleted: false,
      plants: [
        {
          id: 1,
          name: 'plant1',
          plantsListId: 1,
          wateringCycle: 1,
          pictureUrl: 'testpicture',
          wateringCycleBeginingData: new Date(),
          lastTimeWatered: new Date(),
        },
        {
          id: 2,
          name: 'plant2',
          plantsListId: 2,
          wateringCycle: 2,
          pictureUrl: 'testpicture',
          wateringCycleBeginingData: new Date(),
          lastTimeWatered: new Date(),
        },
        {
          id: 3,
          name: 'plant3',
          plantsListId: 3,
          wateringCycle: 3,
          pictureUrl: 'testpicture',
          wateringCycleBeginingData: new Date(),
          lastTimeWatered: new Date(),
        },
      ],
    };

    const newState = plantsListsReducer(undefined, {
      type: showPlantsListType,
      ...newPlantData,
    });

    expect(newPlantData).toEqual(newState);
  });
});
