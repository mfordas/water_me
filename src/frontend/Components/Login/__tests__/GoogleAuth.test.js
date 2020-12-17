import React from 'react';
import { shallow } from 'enzyme';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { testStore } from '../../../Utils/actionCreatorsUtils';
import GoogleAuth from '../googleAuth';


const setUp = (initialState={}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<GoogleAuth store={store} />).childAt(0).dive();
    return wrapper;
};

describe('Google auth component', () => {
    let wrapper;

    beforeEach(()=> {
        const initialState = {
            loginData: {
                loginData: {
                    name: '',
                    googleId: '',
                    invalidData: false,
                },
                    isLogged: false,
                }
            };

            wrapper = setUp(initialState);
    });


    it('Should render without error', () => {

        const component = findByDataTestAtrr(wrapper, 'googleAuthComponent');
        expect(component.length).toBe(1);

    })
})