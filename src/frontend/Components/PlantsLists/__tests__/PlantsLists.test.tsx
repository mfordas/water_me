import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import AddPlantsList from '../addPlantsList';
import ShowPlantsLists from '../showPlantsLists';
import PlantsListComponent from '../index';

describe('PlantsLists Component', () => {
  it('Should render without error', () => {
    const component: ShallowWrapper = shallow(<PlantsListComponent />);

    console.log(component.debug());

    expect(component.find(AddPlantsList).length).toBe(1);
    expect(component.find(ShowPlantsLists).length).toBe(1);
  });
});
