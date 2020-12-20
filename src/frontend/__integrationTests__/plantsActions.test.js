import nock from "nock";
import { testStore } from "../Utils/actionCreatorsUtils";
import {
  addPlantToList,
  deletePlant,
  updateLastWateringDate,
  uploadPlantImage,
} from "../redux_actions/plantsActions";

jest.mock("jwt-decode", () => () => ({}));
jest.mock("../Utils/generateAuthTokenForExternalUser", () => () => ({}));

describe("Add plant action", () => {
  test("Store is updated correctly when response is 200", () => {
    const expectedState = {
      plantsData: {
        plantData: {
          id: 1,
          name: "Plant1",
        },
        plantDeleted: false,
        wateringDateUpdated: false,
        imageName: "",
      },
    };

    const store = testStore({
      plantsData: {
        plantData: {},
        plantDeleted: false,
        wateringDateUpdated: false,
        imageName: "",
      },
    });

    nock(`http://localhost/api`)
      .post(`/plants/${expectedState.plantsData.plantData.id}`)
      .reply(
        200,
        {
          name: expectedState.plantsData.plantData.name,
          id: expectedState.plantsData.plantData.id,
        },
        { "x-auth-token": "123456" }
      );

    return store
      .dispatch(
        addPlantToList(
          expectedState.plantsData.plantData,
          expectedState.plantsData.plantData.id
        )
      )
      .then(() => {
        const newState = store.getState();
        expect(newState.plantsData).toEqual(expectedState.plantsData);
      });
  });

  test("Store is updated correctly when response is 400", () => {
    const expectedState = {
      plantsData: {
        plantData: {},
        plantDeleted: false,
        wateringDateUpdated: false,
        imageName: "",
      },
    };

    const store = testStore({
      plantsData: {
        plantData: {},
        plantDeleted: false,
        wateringDateUpdated: false,
        imageName: "",
      },
    });

    nock(`http://localhost/api`).post(`/plants/1`).reply(400);

    return store
      .dispatch(addPlantToList(expectedState.plantsData.plantData, 1))
      .then(() => {
        const newState = store.getState();
        expect(newState.plantsData).toEqual(expectedState.plantsData);
      });
  });
});

describe("Delete plant action", () => {
  test("Store is updated correctly when response is 200", () => {
    const expectedState = {
      plantsData: {
        plantData: {},
        plantDeleted: true,
        wateringDateUpdated: false,
        imageName: "",
      },
    };

    const store = testStore({
      plantsData: {
        plantData: {},
        plantDeleted: false,
        wateringDateUpdated: false,
        imageName: "",
      },
    });

    const requestIds = {
      userId: "1234",
      plantId: 1,
    };

    nock(`http://localhost/api`)
      .delete(`/plants/${requestIds.userId}/${requestIds.plantId}`)
      .reply(200);

    return store
      .dispatch(deletePlant(requestIds.userId, requestIds.plantId))
      .then(() => {
        const newState = store.getState();
        expect(newState.plantsData).toEqual(expectedState.plantsData);
      });
  });

  test("Store is updated correctly when response is 404", () => {
    const expectedState = {
      plantsData: {
        plantData: {},
        plantDeleted: false,
        wateringDateUpdated: false,
        imageName: "",
      },
    };

    const store = testStore({
      plantsData: {
        plantData: {},
        plantDeleted: false,
        wateringDateUpdated: false,
        imageName: "",
      },
    });

    const requestIds = {
      userId: "1234",
      plantId: 1,
    };

    nock(`http://localhost/api`)
      .delete(`/plants/${requestIds.userId}/${requestIds.plantId}`)
      .reply(404);

    return store
      .dispatch(deletePlant(requestIds.userId, requestIds.plantId))
      .then(() => {
        const newState = store.getState();
        expect(newState.plantsData).toEqual(expectedState.plantsData);
      });
  });
});

  describe("Update watering date action", () => {
    const lastWateringDate = '12-12-2020';

    test("Store is updated correctly when response is 200", () => {
      const expectedState = {
        plantsData: {
          plantData: {},
          plantDeleted: false,
          wateringDateUpdated: true,
          imageName: "",
        },
      };

      const store = testStore({
        plantsData: {
          plantData: {},
          plantDeleted: false,
          wateringDateUpdated: false,
          imageName: "",
        },
      });

      const requestIds = {
        userId: "1234",
        plantId: 1,
      };

      nock(`http://localhost/api`)
        .patch(`/plants/${requestIds.userId}/${requestIds.plantId}`)
        .reply(200,
          {lastTimeWatered: '12-12-2020'});

      return store
        .dispatch(updateLastWateringDate(requestIds.userId, requestIds.plantId, lastWateringDate))
        .then(() => {
          const newState = store.getState();
          expect(newState.plantsData).toEqual(expectedState.plantsData);
        });
    });

    test("Store is updated correctly when response is 404", () => {
      const expectedState = {
        plantsData: {
          plantData: {},
          plantDeleted: false,
          wateringDateUpdated: false,
          imageName: "",
        },
      };

      const store = testStore({
        plantsData: {
          plantData: {},
          plantDeleted: false,
          wateringDateUpdated: false,
          imageName: "",
        },
      });

      const requestIds = {
        userId: "1234",
        plantId: 1,
      };

      
      nock(`http://localhost/api`)
        .patch(`/plants/${requestIds.userId}/${requestIds.plantId}`)
        .reply(404);

      return store
        .dispatch(updateLastWateringDate(requestIds.userId, requestIds.plantId, lastWateringDate))
        .then(() => {
          const newState = store.getState();
          expect(newState.plantsData).toEqual(expectedState.plantsData);
        });
    });
  });

  describe("Image upload action", () => {
    const imageName = 'SampleImage';

    test("Store is updated correctly when response is 200", () => {
      const expectedState = {
        plantsData: {
          plantData: {},
          plantDeleted: false,
          wateringDateUpdated: false,
          imageName: imageName,
        },
      };

      const store = testStore({
        plantsData: {
          plantData: {},
          plantDeleted: false,
          wateringDateUpdated: false,
          imageName: "",
        },
      });


      nock(`http://localhost/api`)
        .post(`/plants/image`)
        .reply(200,
          imageName);

      return store
        .dispatch(uploadPlantImage({name: imageName}))
        .then(() => {
          const newState = store.getState();
          expect(newState.plantsData).toEqual(expectedState.plantsData);
        });
    });

    test("Store is updated correctly when response is 404", () => {
      const expectedState = {
        plantsData: {
          plantData: {},
          plantDeleted: false,
          wateringDateUpdated: false,
          imageName: "",
        },
      };

      const store = testStore({
        plantsData: {
          plantData: {},
          plantDeleted: false,
          wateringDateUpdated: false,
          imageName: "",
        },
      });

      nock(`http://localhost/api`)
        .post(`/plants/image`)
        .reply(400);

      return store
        .dispatch(uploadPlantImage(imageName))
        .then(() => {
          const newState = store.getState();
          expect(newState.plantsData).toEqual(expectedState.plantsData);
        });
    });
  });