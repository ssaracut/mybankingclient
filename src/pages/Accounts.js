import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Card, CardTitle, CardText } from 'react-mdl/lib/Card'
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib';

import AccountsActions from '../core/redux/accounts/AccountsActions'

class AccountsPage extends React.Component {
    componentWillMount() {
        if (this.props.accounts === null) {
            this.props.accountsActions.getAccounts();
        }
    }

    render() {
        if (this.props.accounts === null) {
            return (
                <Card style={{ margin: "0 auto", marginTop: "30px", width: '80%' }}>
                    <CardTitle>Accounts</CardTitle>
                    <CardText>
                        <img src="images/spinner-small.gif"/>
                    </CardText>
                </Card>
            );
        }
        else {

            return (
                <Card shadow={0} style={{ margin: "0 auto", marginBottom: "30px", marginTop: "30px", width: '80%' }}>
                    <CardTitle>Accounts</CardTitle>
                    <CardText>
                        <List>
                            {this.props.accounts.map(account => (
                                <ListItem key={account.accountKey} twoLine>
                                    <ListItemContent subtitle={account.number}>{account.name}</ListItemContent>
                                    <ListItemAction>
                                        <span>{account.balance}</span>
                                    </ListItemAction>
                                </ListItem>
                            )) }
                        </List>
                    </CardText>
                </Card>
            );
        }
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

