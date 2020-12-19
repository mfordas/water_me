import { TYPES } from "../../redux_actions/types";
import plantsListsReducer from "../plantsListsReducer";

describe("Register Reducer", () => {
  it("Should return default state", () => {
    const newState = plantsListsReducer(undefined, {});

    expect(newState).toEqual({
      plantsListName: "",
      plantsLists: [],
      userId: localStorage.getItem("id"),
      plantsListDeleted: false,
      plants: [],
    });
  });

  it("Should return new state if receiving type add plants list", () => {
    const newPlantData = {
      plantsListName: "XYZ",
      plantsLists: [],
      userId: localStorage.getItem("id"),
      plantsListDeleted: false,
      plants: [],
    };

    const newState = plantsListsReducer(undefined, {
      type: TYPES.addPlantsList,
      plantsListName: newPlantData.plantsListName,
    });

    expect(newPlantData).toEqual(newState);
  });

  it("Should return new state if receiving type get plants lists", () => {
    const newPlantData = {
      plantsListName: "",
      plantsLists: [
        {
          name: "Dom",
        },
        {
          name: "Praca",
        },
      ],
      userId: localStorage.getItem("id"),
      plantsListDeleted: false,
      plants: [],
    };

    const newState = plantsListsReducer(undefined, {
      type: TYPES.getPlantsLists,
      plantsLists: newPlantData.plantsLists,
    });

    expect(newPlantData).toEqual(newState);
  });

  it("Should return new state if receiving type delete plants list", () => {
    const newPlantData = {
      plantsListName: "",
      plantsLists: [],
      userId: localStorage.getItem("id"),
      plantsListDeleted: true,
      plants: [],
    };

    const newState = plantsListsReducer(undefined, {
      type: TYPES.deletePlantsList,
      plantsListDeleted: newPlantData.plantsListDeleted,
    });

    expect(newPlantData).toEqual(newState);
  });

  it("Should return new state if receiving type show plants list", () => {
    const newPlantData = {
      plantsListName: "",
      plantsLists: [],
      userId: localStorage.getItem("id"),
      plantsListDeleted: false,
      plants: [
        {
          name: "plant1",
        },
        {
          name: "plant2",
        },
        {
          name: "plant3",
        },
      ],
    };

    const newState = plantsListsReducer(undefined, {
      type: TYPES.showPlantsList,
      plants: newPlantData.plants,
    });

    expect(newPlantData).toEqual(newState);
  });
});
