import React from "react";
import { shallow } from "enzyme";
import { findByDataTestAtrr } from "../../../Utils/findByDataTestAtrr";
import { testStore } from "../../../Utils/actionCreatorsUtils";
import { DeletePlantsList } from "../deletePlantsList";

const mockFunc = jest.fn();

const setUp = (initialState = {}) => {
  const wrapper = shallow(
    <DeletePlantsList
      plantsListsData={initialState}
      getPlantsListsForUser={mockFunc}
      deletePlantsList= {mockFunc}
      plantsListId={1}
    />
  );
  return wrapper;
};

describe("Delete plants list component", () => {
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
    const component = findByDataTestAtrr(wrapper, "deletePlantListComponent");
    expect(component.length).toBe(1);
  });

  it("Should emit callback on click event", async () => {
    const component = findByDataTestAtrr(wrapper, "deletePlantListComponent");

    const event = {
        preventDefault() {},
        target: { value: 'the-value' }
      };

    await component.simulate("click", event);
    const callback = mockFunc.mock.calls.length;
    expect(callback).toBe(2);
  });
});
