import React from 'react';
import { shallow } from 'enzyme';
import { Logout } from '../Logout';

function setup() {

    const promiseHelper = {
        resolve: undefined,
        reject: undefined
    }
    const props = {
        sessionActions: { logout: jest.fn(() => new Promise((resolve, reject) => { promiseHelper.resolve = resolve, promiseHelper.reject = reject })) }
    }
    const enzymeWrapper = shallow(<Logout {...props} />);

    return {
        promiseHelper,
        props,
        enzymeWrapper
    }

}

it('renders without crashing', () => {

    const {promiseHelper, enzymeWrapper} = setup();
    promiseHelper.resolve();

});