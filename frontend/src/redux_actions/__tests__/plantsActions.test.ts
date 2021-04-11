import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';

import {
  addPlantToList,
  deletePlant,
  updateLastWateringDate,
  uploadPlantImage,
} from '../../redux_actions/plantsActions';
import {
  addPlantType,
  deletePlantType,
  updateLastWateringDateType,
  uploadImageType,
  PlantsState,
} from '../plantsTypes';

const middlewares = [thunk];
const mockStore = configureStore<
  PlantsState,
  ThunkDispatch<PlantsState, any, any>
>(middlewares);

jest.mock('jwt-decode', () => () => ({}));
jest.mock('axios');

describe('Add plant action', () => {
  const store = mockStore({
    plantData: {},
    plantDeleted: false,
    wateringDateUpdated: false,
    imageName: '',
  });

  afterEach(() => {
    store.clearActions();
  });

  it('Action is sended with correct payload', async () => {
    const expectedPayload = {
      test: 'testData',
    };

    (axios.post as jest.Mock).mockReturnValue(
      Promise.resolve({
        status: 200,
        data: { ...expectedPayload },
      })
    );

    const testPlantListId = 1;

    const plantDataFromUser = {
      name: 'TestName',
      wateringCycle: 1,
      pictureUrl: 'TestPicture',
      wateringCycleBeginingData: '2022-01-01',
      lastTimeWatered: '2022-01-01',
    };

    await store.dispatch(addPlantToList(plantDataFromUser, testPlantListId));

    expect(store.getActions()[0].type).toBe(addPlantType);
    expect(store.getActions()[0].plantData).toEqual(expectedPayload);
  });

  it('Action is sended with correct payload when there is an error', async () => {
    (axios.post as jest.Mock).mockReturnValue(
      Promise.reject({
        status: 400,
        message: 'Error message',
      })
    );

    const expectedPayload = {};

    const testPlantListId = 1;

    const plantDataFromUser = {
      name: 'TestName',
      wateringCycle: 1,
      pictureUrl: 'TestPicture',
      wateringCycleBeginingData: '2022-01-01',
      lastTimeWatered: '2022-01-01',
    };

    await store.dispatch(addPlantToList(plantDataFromUser, testPlantListId));

    expect(store.getActions()[0].type).toBe(addPlantType);
    expect(store.getActions()[0].plantData).toEqual(expectedPayload);
  });
});

describe('Delete plant action', () => {
  const testUserId = '1';
  const testPlantId = 1;
  localStorage.setItem('token', 'testToken');
  localStorage.setItem('id', testUserId);

  const store = mockStore({
    plantData: {},
    plantDeleted: false,
    wateringDateUpdated: false,
    imageName: '',
  });

  afterEach(() => {
    store.clearActions();
  });

  it('Action is sended with correct payload', async () => {
    const expectedPayload = {
      plantDeleted: true,
    };

    (axios.delete as jest.Mock).mockReturnValue(
      Promise.resolve({
        status: 200,
        data: { ...expectedPayload },
      })
    );

    await store.dispatch(deletePlant(testPlantId));

    expect(store.getActions()[0].type).toBe(deletePlantType);
    expect(store.getActions()[0].plantDeleted).toEqual(
      expectedPayload.plantDeleted
    );
  });

  it('Action is sended with correct payload when error occures', async () => {
    const expectedPayload = {
      plantDeleted: false,
    };

    (axios.delete as jest.Mock).mockReturnValue(
      Promise.reject({
        status: 400,
        message: 'Error',
      })
    );

    await store.dispatch(deletePlant(testPlantId));

    expect(store.getActions()[0].type).toBe(deletePlantType);
    expect(store.getActions()[0].plantDeleted).toEqual(
      expectedPayload.plantDeleted
    );
  });
});

describe('Update watering action', () => {
  const testUserId = '1';
  const testPlantId = 1;
  const testLastWateringDate = '2022-11-11';
  localStorage.setItem('token', 'testToken');
  localStorage.setItem('id', testUserId);

  const store = mockStore({
    plantData: {},
    plantDeleted: false,
    wateringDateUpdated: false,
    imageName: '',
  });

  afterEach(() => {
    store.clearActions();
  });

  it('Action is sended with correct payload', async () => {
    (axios.patch as jest.Mock).mockReturnValue(
      Promise.resolve({
        status: 200,
      })
    );

    const expectedPayload = {
      wateringDateUpdated: true,
    };

    await store.dispatch(
      updateLastWateringDate(testPlantId, testLastWateringDate)
    );

    expect(store.getActions()[0].type).toBe(updateLastWateringDateType);
    expect(store.getActions()[0].wateringDateUpdated).toEqual(
      expectedPayload.wateringDateUpdated
    );
  });

  it('Action is sended with correct payload when error occures', async () => {
    (axios.patch as jest.Mock).mockReturnValue(
      Promise.reject({
        status: 400,
        message: 'Error',
      })
    );

    const expectedPayload = {
      wateringDateUpdated: false,
    };

    await store.dispatch(
      updateLastWateringDate(testPlantId, testLastWateringDate)
    );

    console.log(store.getActions());

    expect(store.getActions()[0].type).toBe(updateLastWateringDateType);
    expect(store.getActions()[0].wateringDateUpdated).toEqual(
      expectedPayload.wateringDateUpdated
    );
  });
});

describe('Upload image action', () => {
  const testUserId = '1';
  const testImageName = 'TestImage';
  localStorage.setItem('token', 'testToken');
  localStorage.setItem('id', testUserId);

  const photoData = new FormData();
  photoData.append('image', testImageName);

  const store = mockStore({
    plantData: {},
    plantDeleted: false,
    wateringDateUpdated: false,
    imageName: '',
  });

  afterEach(() => {
    store.clearActions();
  });

  it('Action is sended with correct payload', async () => {
    (axios.post as jest.Mock).mockReturnValue(
      Promise.resolve({
        status: 200,
        data: testImageName,
      })
    );

    const expectedPayload = {
      imageName: testImageName,
    };

    await store.dispatch(uploadPlantImage(photoData));

    expect(store.getActions()[0].type).toBe(uploadImageType);
    expect(store.getActions()[0].imageName).toEqual(expectedPayload.imageName);
  });

  it('Action is sended with correct payload when error occures', async () => {
    (axios.post as jest.Mock).mockReturnValue(
      Promise.reject({
        status: 400,
        message: 'Error',
      })
    );

    const expectedPayload = {
      imageName: '',
    };

    await store.dispatch(uploadPlantImage(photoData));

    expect(store.getActions()[0].type).toBe(uploadImageType);
    expect(store.getActions()[0].imageName).toEqual(expectedPayload.imageName);
  });
});
