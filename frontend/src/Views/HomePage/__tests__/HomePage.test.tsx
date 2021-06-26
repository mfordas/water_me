import { shallow, ShallowWrapper } from 'enzyme';

import { HomePage } from '../index';
import { GoogleAuthConnected } from '../../../Components/Login/googleAuth';
import { GoogleRegisterConnected } from '../../../Components/Register/googleRegister';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';

const setUp = () => {
    const component = shallow(<HomePage />);
    return component;
};

describe('HomePage component', () => {
    let component: ShallowWrapper;
    beforeEach(() => {
        component = setUp();
    });

    it('Should render without error', () => {
        const wrapper = findByDataTestAtrr(component, 'homePage');

        expect(wrapper.find('p').text()).toBe(
            // eslint-disable-next-line max-len
            'Cześć! Witamy w programie WaterMe! Dzięki niemu już nigdy nie zapomnisz o podlewaniu swoich roślin. Twórz listy roślin z domu, ogrodu, pracy i innych miejsc. Ustawiaj harmonogramy podlewania a rośliny same dadzą Ci znać, że potrzebują wody. Jeśli zapomnisz o podlewaniu będziesz otrzymywał kolejne przypomnienia, które uratują Twoje rośliny. '
        );
        expect(wrapper.find(GoogleAuthConnected).length).toBe(1);
        expect(wrapper.find(GoogleRegisterConnected).length).toBe(1);
    });
});
