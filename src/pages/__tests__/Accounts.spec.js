import React from 'react';
import { shallow } from 'enzyme';
import { Accounts } from '../Accounts';

function setup() {

    const props = {
        accountsActions: { getAccounts: jest.fn() },
        accountState: { accounts: [] }
    }

    const enzymeWrapper = shallow(<Accounts {...props} />);

    return {
        props,
        enzymeWrapper
    }

}

it('renders without crashing', () => {

    const {enzymeWrapper} = setup();

});