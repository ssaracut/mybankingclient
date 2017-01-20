import React from 'react';
import { shallow } from 'enzyme';
import { AuthRedirect } from '../AuthRedirect';

function setup() {

    const promiseHelper = {
        resolve: undefined,
        reject: undefined
    }

    const url = document.createElement('a');
    url.href = 'https://localhost:3000/?code=1234';
    url.query = url.search;

    const props = {
        router: { getCurrentLocation: jest.fn(() => url) },
        sessionActions: { getApiAuthToken: jest.fn(() => new Promise((resolve, reject) => { promiseHelper.resolve = resolve, promiseHelper.reject = reject })) }
    }
    const enzymeWrapper = shallow(<AuthRedirect {...props} />);

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