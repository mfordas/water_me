import React from "react";
import { shallow } from "enzyme";
import { findByDataTestAtrr } from "../../../Utils/findByDataTestAtrr";
import { testStore } from "../../../Utils/actionCreatorsUtils";
import AddPlantsList from "../addPlantsList";

const mockFunc = jest.fn();

const setUp = (initialState = {}) => {
  const store = testStore(initialState);
  const wrapper = shallow(
    <AddPlantsList
      store={store}
      addPlantsList={mockFunc}
      getPlantsListsForUser={mockFunc}
    />
  )
    .childAt(0)
    .dive();
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

});