import React from "react";
import { shallow } from "enzyme";
import { findByDataTestAtrr } from "../../../Utils/findByDataTestAtrr";
import { ShowPlantsLists } from "../showPlantsLists";

const mockFunc = jest.fn();

const setUp = (initialState = {}) => {
  const wrapper = shallow(
    <ShowPlantsLists
      plantsListsData={initialState}
      getPlantsListsForUser={mockFunc}
    />
  );
  return wrapper;
};

describe("Delete plants list component", () => {
  let wrapper;

  beforeEach(() => {
    const initialState = {
      plantsListName: "",
      plantsLists: [
        {
          id: 1,
          name: "list1",
        },
        {
          id: 2,
          name: "list2",
        },
        {
          id: 3,
          name: "list3",
        },
      ],
      userId: "123456789",
      plantsListDeleted: false,
    };

    wrapper = setUp(initialState);
  });

  it("Should render without error", () => {
    const component = findByDataTestAtrr(wrapper, "showPlantsListsComponent");
    const plantsListContainers = findByDataTestAtrr(
      wrapper,
      "plantsListContainer"
    );

    expect(component.length).toBe(1);
    expect(plantsListContainers.length).toBe(3);
  });
});
