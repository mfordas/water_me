import nock from 'nock';
import { testStore } from '../Utils/actionCreatorsUtils';
import {
  addPlantsList,
  deletePlantsList,
  getPlantsLists,
  getPlantsListsForUser,
  showPlantsList,
} from '../redux_actions/plantsListsActions';

jest.mock('jwt-decode', () => () => ({}));
jest.mock('../Utils/generateAuthTokenForExternalUser', () => () => ({}));

xdescribe('Get plants lists action', () => {
  test('Store is updated correctly when response is 200', () => {
    const expectedState = {
      plantsListsData: {
        plantsListName: '',
        plantsLists: [
          {
            id: 1,
            name: 'list1',
          },
          {
            id: 2,
            name: 'list2',
          },
          {
            id: 3,
            name: 'list3',
          },
        ],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    };

    const store = testStore({
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    });

    nock(`http://localhost/api`)
      .get(`/plantsLists`)
      .reply(200, expectedState.plantsListsData.plantsLists);

    return store.dispatch(getPlantsLists()).then(() => {
      const newState = store.getState();
      expect(newState.plantsListsData).toEqual(expectedState.plantsListsData);
    });
  });

  test('Store is updated correctly when response is 400', () => {
    const expectedState = {
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    };

    const store = testStore({
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    });

    nock(`http://localhost/api`).get(`/plantsLists`).reply(400);

    return store.dispatch(getPlantsLists()).then(() => {
      const newState = store.getState();
      expect(newState.plantsListsData).toEqual(expectedState.plantsListsData);
    });
  });
});

xdescribe('Add plants list action', () => {
  test('Store is updated correctly when response is 200', () => {
    const expectedState = {
      plantsListsData: {
        plantsListName: 'List1',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    };

    const store = testStore({
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    });

    nock(`http://localhost/api`)
      .post(`/plantsLists`)
      .reply(200, { name: expectedState.plantsListsData.plantsListName });

    return store
      .dispatch(addPlantsList(expectedState.plantsListsData.plantsListName))
      .then(() => {
        const newState = store.getState();
        expect(newState.plantsListsData).toEqual(expectedState.plantsListsData);
      });
  });

  test('Store is updated correctly when response is 400', () => {
    const expectedState = {
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    };

    const store = testStore({
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    });

    nock(`http://localhost/api`).post(`/plantsLists`).reply(400);

    return store
      .dispatch(addPlantsList(expectedState.plantsListsData.plantsListName))
      .then(() => {
        const newState = store.getState();
        expect(newState.plantsListsData).toEqual(expectedState.plantsListsData);
      });
  });
});

xdescribe('Get plants lists for user action', () => {
  const userId = '123456789';

  test('Store is updated correctly when response is 200', () => {
    const expectedState = {
      plantsListsData: {
        plantsListName: '',
        plantsLists: [
          {
            id: 1,
            name: 'list1',
          },
          {
            id: 2,
            name: 'list2',
          },
          {
            id: 3,
            name: 'list3',
          },
        ],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    };

    const store = testStore({
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    });

    nock(`http://localhost/api`)
      .get(`/plantsLists/${userId}`)
      .reply(200, expectedState.plantsListsData.plantsLists);

    return store.dispatch(getPlantsListsForUser(userId)).then(() => {
      const newState = store.getState();
      expect(newState.plantsListsData).toEqual(expectedState.plantsListsData);
    });
  });

  test('Store is updated correctly when response is 400', () => {
    const expectedState = {
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    };

    const store = testStore({
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    });

    nock(`http://localhost/api`).get(`/plantsLists/${userId}`).reply(400);

    return store.dispatch(getPlantsListsForUser(userId)).then(() => {
      const newState = store.getState();
      expect(newState.plantsListsData).toEqual(expectedState.plantsListsData);
    });
  });
});

xdescribe('Delete plants list action', () => {
  const requestIds = {
    userId: '123456789',
    plantsListId: 1,
  };

  test('Store is updated correctly when response is 200', () => {
    const expectedState = {
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: true,
        plants: [],
      },
    };

    const store = testStore({
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    });

    nock(`http://localhost/api`)
      .delete(`/plantsLists/${requestIds.userId}/${requestIds.plantsListId}`)
      .reply(200);

    return store
      .dispatch(deletePlantsList(requestIds.userId, requestIds.plantsListId))
      .then(() => {
        const newState = store.getState();
        expect(newState.plantsListsData).toEqual(expectedState.plantsListsData);
      });
  });

  test('Store is updated correctly when response is 400', () => {
    const expectedState = {
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    };

    const store = testStore({
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    });

    nock(`http://localhost/api`)
      .delete(`/plantsLists/${requestIds.userId}/${requestIds.plantsListId}`)
      .reply(400);

    return store
      .dispatch(deletePlantsList(requestIds.userId, requestIds.plantsListId))
      .then(() => {
        const newState = store.getState();
        expect(newState.plantsListsData).toEqual(expectedState.plantsListsData);
      });
  });
});

xdescribe('Show plants action', () => {
  const requestIds = {
    userId: '123456789',
    plantsListId: 1,
  };

  test('Store is updated correctly when response is 200', () => {
    const expectedState = {
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [
          {
            name: 'Plant1',
          },
          {
            name: 'Plant2',
          },
          {
            name: 'Plant3',
          },
        ],
      },
    };

    const store = testStore({
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    });

    nock(`http://localhost/api`)
      .get(`/plants/${requestIds.userId}/${requestIds.plantsListId}`)
      .reply(200, expectedState.plantsListsData.plants);

    return store
      .dispatch(showPlantsList(requestIds.userId, requestIds.plantsListId))
      .then(() => {
        const newState = store.getState();
        expect(newState.plantsListsData).toEqual(expectedState.plantsListsData);
      });
  });

  test('Store is updated correctly when response is 400', () => {
    const expectedState = {
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    };

    const store = testStore({
      plantsListsData: {
        plantsListName: '',
        plantsLists: [],
        userId: localStorage.getItem('id'),
        plantsListDeleted: false,
        plants: [],
      },
    });

    nock(`http://localhost/api`)
      .get(`/plants/${requestIds.userId}/${requestIds.plantsListId}`)
      .reply(400);

    return store
      .dispatch(showPlantsList(requestIds.userId, requestIds.plantsListId))
      .then(() => {
        const newState = store.getState();
        expect(newState.plantsListsData).toEqual(expectedState.plantsListsData);
      });
  });
});
