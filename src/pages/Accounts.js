import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Card, CardTitle, CardText } from 'react-mdl/lib/Card'

import AccountsActions from '../core/redux/accounts/AccountsActions'

class AccountsPage extends React.Component {
    componentWillMount() {
        if (this.props.accounts === null) {
            this.props.accountsActions.getAccounts();
        }
    }
    render() {
        return (
            <Card shadow={0} style={{ width: '512px', margin: 'auto' }}>
                <CardTitle>Accounts</CardTitle>
                <CardText>
                    This page will show account information.
                </CardText>
            </Card>
        );
    }
}

const mapStateToProps = function (state) {
    return state.AccountsReducer;
};

const mapDispatchToProps = function (dispatch) {
    return {
        accountsActions: bindActionCreators(AccountsActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);

