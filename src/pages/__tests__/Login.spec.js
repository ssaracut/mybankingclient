import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../Login';

function setup() {

    const promiseHelper = {
        resolve: undefined,
        reject: undefined
    }
    const props = {
        session: { loggedIn: false },
        sessionActions: { login: jest.fn(() => new Promise((resolve, reject) => { promiseHelper.resolve = resolve, promiseHelper.reject = reject })) }
    }
    const enzymeWrapper = shallow(<Login {...props} />);

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