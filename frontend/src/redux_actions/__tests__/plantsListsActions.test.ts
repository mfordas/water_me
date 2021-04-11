import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import {
  addPlantsList,
  deletePlantsList,
  showPlantsList,
  getPlantsListsForUser,
} from '../../redux_actions/plantsListsActions';
import {
  addPlantsListType,
  deletePlantsListType,
  showPlantsListType,
  getPlantsListsType,
  PlantsListsState,
  PlantsList,
} from '../plantsListsTypes';
import { Plant } from '../plantsTypes';

const middlewares = [thunk];
const mockStore = configureStore<
  PlantsListsState,
  ThunkDispatch<PlantsListsState, any, any>
>(middlewares);

jest.mock('jwt-decode', () => () => ({}));
jest.mock('axios');

const store = mockStore({
  plantsListName: '',
  plantsLists: [],
  userId: localStorage.getItem('id'),
  plantsListDeleted: false,
  plants: [],
});

const testUserId = '1';
const testPlantsListId = 1;
localStorage.setItem('token', 'testToken');
localStorage.setItem('id', testUserId);

describe('Get plants lists action', () => {
  afterEach(() => {
    store.clearActions();
  });
  it('Action is sended with correct payload', async () => {
    const expectedPayload = [
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
    ];

    (axios.get as jest.Mock).mockReturnValue(
      Promise.resolve({
        status: 200,
        data: expectedPayload,
      })
    );

    await store.dispatch(getPlantsListsForUser());

    expect(store.getActions()[0].type).toBe(getPlantsListsType);
    expect(store.getActions()[0].plantsLists).toEqual(expectedPayload);
  });

  it('Action is sended with correct payload when there is an error', async () => {
    (axios.get as jest.Mock).mockReturnValue(
      Promise.reject({
        status: 404,
        message: 'Error',
      })
    );

    const expectedPayload: PlantsList[] = [];

    await store.dispatch(getPlantsListsForUser());

    expect(store.getActions()[0].type).toBe(getPlantsListsType);
    expect(store.getActions()[0].plantsLists).toEqual(expectedPayload);
  });
});

describe('Add plants lists action', () => {
  afterEach(() => {
    store.clearActions();
  });
  it('Action is sended with correct payload', async () => {
    const testPlantListName = 'TestName';

    (axios.post as jest.Mock).mockReturnValue(
      Promise.resolve({
        status: 200,
        data: { name: testPlantListName },
      })
    );

    await store.dispatch(addPlantsList(testPlantListName));

    expect(store.getActions()[0].type).toBe(addPlantsListType);
    expect(store.getActions()[0].plantsListName).toEqual(testPlantListName);
  });

  it('Action is sended with correct payload when there is an error', async () => {
    const testPlantListName = 'TestName';
    const expectedPayload = '';

    (axios.post as jest.Mock).mockReturnValue(
      Promise.reject({
        status: 404,
        message: 'Error',
      })
    );

    await store.dispatch(addPlantsList(testPlantListName));

    expect(store.getActions()[0].type).toBe(addPlantsListType);
    expect(store.getActions()[0].plantsListName).toBe(expectedPayload);
  });
});

describe('Delete plants lists action', () => {
  afterEach(() => {
    store.clearActions();
  });
  it('Action is sended with correct payload', async () => {
    const expectedPayload = true;

    (axios.delete as jest.Mock).mockReturnValue(
      Promise.resolve({
        status: 200,
      })
    );

    await store.dispatch(deletePlantsList(testPlantsListId));

    expect(store.getActions()[0].type).toBe(deletePlantsListType);
    expect(store.getActions()[0].plantsListDeleted).toBe(expectedPayload);
  });

  it('Action is sended with correct payload when there is an error', async () => {
    const expectedPayload = false;

    (axios.delete as jest.Mock).mockReturnValue(
      Promise.reject({
        status: 400,
        message: 'Error',
      })
    );

    await store.dispatch(deletePlantsList(testPlantsListId));

    expect(store.getActions()[0].type).toBe(deletePlantsListType);
    expect(store.getActions()[0].plantsListDeleted).toBe(expectedPayload);
  });
});

describe('Show plants list action', () => {
  afterEach(() => {
    store.clearActions();
  });
  it('Action is sended with correct payload', async () => {
    const expectedPayload = [
      {
        id: 1,
        name: 'testName',
        plantsListId: testPlantsListId,
        wateringCycle: 1,
        pictureUrl: 'test/path/to/picture',
        wateringCycleBeginingData: '2021-01-01',
        lastTimeWatered: '2021-01-01',
      },
    ];

    (axios.get as jest.Mock).mockReturnValue(
      Promise.resolve({
        status: 200,
        data: expectedPayload,
      })
    );

    await store.dispatch(showPlantsList(testPlantsListId));

    expect(store.getActions()[0].type).toBe(showPlantsListType);
    expect(store.getActions()[0].plants).toEqual(expectedPayload);
  });

  it('Action is sended with correct payload when there is an error', async () => {
    const expectedPayload: Plant[] = [];

    (axios.get as jest.Mock).mockReturnValue(
      Promise.reject({
        status: 404,
        message: 'Error',
      })
    );

    await store.dispatch(showPlantsList(testPlantsListId));

    expect(store.getActions()[0].type).toBe(showPlantsListType);
    expect(store.getActions()[0].plants).toEqual(expectedPayload);
  });
});
