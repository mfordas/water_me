import { shallow, ShallowWrapper } from 'enzyme';

import { PlantsLists } from '../index';
import { PlantsListsComponent } from '../../../Components/PlantsLists/index';

const setUp = () => {
    const component = shallow(<PlantsLists />);
    return component;
};

describe('HomePage component', () => {
    let component: ShallowWrapper;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render without error', () => {
        expect(component.find(PlantsListsComponent).length).toBe(1);
    });
});
