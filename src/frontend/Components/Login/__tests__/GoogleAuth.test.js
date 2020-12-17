import React from 'react';
import { shallow } from 'enzyme';
import { findByDataTestAtrr } from '../../../Utils/findByDataTestAtrr';
import { testStore } from '../../../Utils/actionCreatorsUtils';
import GoogleAuth from '../googleAuth';

jest.mock( '../../../redux_actions/loginActions', () => () => ({ }));

const mockFunc = jest.fn();

const setUp = (initialState={}) => {
    const store = testStore(initialState);
    const wrapper = shallow(<GoogleAuth store={store} loginExternal={mockFunc}/>).childAt(0).dive();
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

    });

    xit('Should emit callback on click event', () => {
        const component = findByDataTestAtrr(wrapper, 'googleAuthComponent');
        component.simulate('click');
        const callback = mockFunc.mock.calls.length;
        expect(callback).toBe(1);
    })
})