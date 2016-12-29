import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Card, CardActions, CardMenu, CardTitle, CardText } from 'react-mdl/lib/Card'
import { Button, Cell, Grid, IconButton, Spinner } from 'react-mdl/lib';

import AccountsActions from '../core/redux/accounts/AccountsActions'

class AccountTransactions extends React.Component {
    componentWillMount() {
        if (this.props.account === null) {
            //   this.props.accountsActions.getAccounts();
        }
    }

    render() {
        if (this.props.account === null) {
            return (
                <Spinner style={{margin: 'auto'}}/>
            );
        }
        else {
            return (
                <div>Transactions for a single account goes here.</div>
            );
        }
    }
}