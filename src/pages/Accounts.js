import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Card, CardActions, CardMenu, CardTitle, CardText } from 'react-mdl/lib/Card'
import { Button, Cell, Grid, IconButton } from 'react-mdl/lib';

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
                        <img src="images/spinner-small.gif" alt="" />
                    </CardText>
                </Card>
            );
        }
        else {
            return (
                <div style={{width: '80%', margin: 'auto'}}>{renderGrid(this.props.accounts)}</div>
            );
        }
    }
}

const renderGrid = function(accounts) {
    var cells = [];

    for (var i = 0; i < accounts.length; i++) {
        cells.push(renderCell(accounts[i]))
    }

    return (
        <Grid className="">{cells}</Grid>
    );
}

const renderCell = function(account) {
    return (
        <Cell col={4} key={account.accountKey}>
            <Card shadow={0} style={{ margin: "0 auto", marginBottom: "10px", width: '100%' }}>
                <CardTitle>{account.name}</CardTitle>
                <CardText>
                    {account.description}
                    <br /><br />
                    <b>$ {account.balance}</b>
                </CardText>
                <CardActions border>
                    <Button colored>More quick option icons here</Button>
                </CardActions>
                <CardMenu style={{color: '#000'}}>
                    <IconButton name="more_vert" />
                </CardMenu>
            </Card>
        </Cell>
    );
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
