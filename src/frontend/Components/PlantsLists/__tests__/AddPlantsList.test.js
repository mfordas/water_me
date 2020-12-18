import React from "react";
import { mount } from "enzyme";
import { findByDataTestAtrr } from "../../../Utils/findByDataTestAtrr";
import { testStore } from "../../../Utils/actionCreatorsUtils";
import { AddPlantsList } from "../addPlantsList";

const mockFunc = jest.fn();

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = mount(
    <AddPlantsList
      store={store}
      addPlantsList={mockFunc}
      getPlantsListsForUser={mockFunc}
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
    };
      wrapper = setUp(initialState);
  });

  it("Should render without error", () => {
    const component = findByDataTestAtrr(wrapper, "addPlantListComponent");
    expect(component.length).toBe(1);
  });

  it("Should emit callback on click event", async () => {
    const component = findByDataTestAtrr(wrapper, "addPlantsListButton");
    const input = findByDataTestAtrr(wrapper, "inputAddPlantsList");

    const event = {
      target: { value: "listname" },
    };
    input.simulate("change", event);

    await component.simulate("click");
    const callback = mockFunc.mock.calls.length;
    expect(callback).toBe(2);
  });
});
