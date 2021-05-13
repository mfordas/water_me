import { shallow, ShallowWrapper } from 'enzyme';

import { AddPlantsListConnected } from '../addPlantsList';
import { ShowPlantsListsConnected } from '../showPlantsLists';
import { PlantsListsComponent } from '../index';

describe('PlantsLists Component', () => {
    it('Should render without error', () => {
        const component: ShallowWrapper = shallow(<PlantsListsComponent />);

        expect(component.find(AddPlantsListConnected).length).toBe(1);
        expect(component.find(ShowPlantsListsConnected).length).toBe(1);
    });
});
