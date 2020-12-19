import React from "react";
import { mount } from "enzyme";
import { findByDataTestAtrr } from "../../../Utils/findByDataTestAtrr";
import { AddPlant } from "../addPlant";

const mockFunc = jest.fn();

const setUp = (initialState = {}) => {
  const wrapper = mount(
    <AddPlant
      listId={1}
      addPlantToList={mockFunc}
      uploadPlantImage={mockFunc}
      plantsData={initialState.plantsData}
      showPlantsList={mockFunc}
    />
  );
  return wrapper;
};

describe("Add plants list component", () => {
  let wrapper;

  beforeEach(() => {
    const initialState = {
      plantsListsData: {
        plantsListName: "",
        plantsLists: [],
        userId: "123456789",
        plantsListDeleted: false,
      },
      plantsData: {
        plantData: {},
        plantDeleted: false,
        wateringDateUpdated: false,
        imageName: "",
      },
    };
    wrapper = setUp(initialState);

  });

  it("Should render without error", () => {
    const component = findByDataTestAtrr(wrapper, "addPlantComponent");
    expect(component.length).toBe(1);
  });

});