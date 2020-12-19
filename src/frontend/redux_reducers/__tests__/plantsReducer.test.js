import { TYPES } from "../../redux_actions/types";
import plantsReducer from "../plantsReducer";

describe("Register Reducer", () => {
  it("Should return default state", () => {
    const newState = plantsReducer(undefined, {});

    expect(newState).toEqual({
      plantData: {},
      plantDeleted: false,
      wateringDateUpdated: false,
      imageName: "",
    });
  });

  it("Should return new state if receiving type add plant", () => {
    const newPlantData = {
      plantData: {
        name: 'Plant1',
        wateringCycle: 3,
        pictureUrl: '/sample/url'
      },
      plantDeleted: false,
      wateringDateUpdated: false,
      imageName: "",
    };

    const newState = plantsReducer(undefined, {
      type: TYPES.addPlant,
      plantData: newPlantData.plantData
    });

    expect(newPlantData).toEqual(newState);
  });

  it("Should return new state if receiving type delete plant", () => {
    const newPlantData = {
      plantData: {},
      plantDeleted: true,
      wateringDateUpdated: false,
      imageName: "",
    };

    const newState = plantsReducer(undefined, {
      type: TYPES.deletePlant,
      plantDeleted: newPlantData.plantDeleted
    });

    expect(newPlantData).toEqual(newState);
  });

  it("Should return new state if receiving type update watering data", () => {
    const newPlantData = {
      plantData: {},
      plantDeleted: false,
      wateringDateUpdated: true,
      imageName: "",
    };

    const newState = plantsReducer(undefined, {
      type: TYPES.updateLastWateringDate,
      wateringDateUpdated: newPlantData.wateringDateUpdated
    });

    expect(newPlantData).toEqual(newState);
  });

  it("Should return new state if receiving type upload image", () => {
    const newPlantData = {
      plantData: {},
      plantDeleted: false,
      wateringDateUpdated: false,
      imageName: "XYZ",
    };

    const newState = plantsReducer(undefined, {
      type: TYPES.uploadImage,
      imageName: newPlantData.imageName
    });

    expect(newPlantData).toEqual(newState);
  });

});
