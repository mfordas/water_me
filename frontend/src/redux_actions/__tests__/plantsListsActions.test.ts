import nock from 'nock';
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
    nock(`http://localhost/api`)
      .get(`/plantsLists/${testUserId}`)
      .reply(200, expectedPayload);

    await store.dispatch(getPlantsListsForUser());

    expect(store.getActions()[0].type).toBe(getPlantsListsType);
    expect(store.getActions()[0].plantsLists).toEqual(expectedPayload);
  });

  it('Action is sended with correct payload when there is an error', async () => {
    const expectedPayload: PlantsList[] = [];

    nock(`http://localhost/api`).get(`/plantsLists/${testUserId}`).reply(404);

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
    nock(`http://localhost/api`)
      .post(`/plantsLists`)
      .reply(200, { name: testPlantListName });

    await store.dispatch(addPlantsList(testPlantListName));

    expect(store.getActions()[0].type).toBe(addPlantsListType);
    expect(store.getActions()[0].plantsListName).toEqual(testPlantListName);
  });

  it('Action is sended with correct payload when there is an error', async () => {
    const testPlantListName = 'TestName';
    const expectedPayload = '';
    nock(`http://localhost/api`).post(`/plantsLists`).reply(404);

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
    nock(`http://localhost/api`)
      .delete(`/plantsLists/${testUserId}/${testPlantsListId}`)
      .reply(200);

    await store.dispatch(deletePlantsList(testPlantsListId));

    expect(store.getActions()[0].type).toBe(deletePlantsListType);
    expect(store.getActions()[0].plantsListDeleted).toBe(expectedPayload);
  });

  it('Action is sended with correct payload when there is an error', async () => {
    const expectedPayload = false;
    nock(`http://localhost/api`)
      .delete(`/plantsLists/${testUserId}/${testPlantsListId}`)
      .reply(400);

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

    nock(`http://localhost/api`)
      .get(`/plants/${testUserId}/${testPlantsListId}`)
      .reply(200, expectedPayload);

    await store.dispatch(showPlantsList(testPlantsListId));

    expect(store.getActions()[0].type).toBe(showPlantsListType);
    expect(store.getActions()[0].plants).toEqual(expectedPayload);
  });

  it('Action is sended with correct payload when there is an error', async () => {
    const expectedPayload: Plant[] = [];

    nock(`http://localhost/api`)
      .get(`/plants/${testUserId}/${testPlantsListId}`)
      .reply(404);

    await store.dispatch(showPlantsList(testPlantsListId));

    expect(store.getActions()[0].type).toBe(showPlantsListType);
    expect(store.getActions()[0].plants).toEqual(expectedPayload);
  });
});
