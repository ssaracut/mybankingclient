import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Card, CardActions, CardMenu, CardTitle, CardText } from 'react-mdl/lib/Card'
import { Button, Cell, Grid, IconButton, Spinner } from 'react-mdl/lib';

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
                <Spinner style={{margin: 'auto'}} />
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
                <CardText>
                    <b>{account.name}</b>
                    <br />{account.number}
                    <br /><br />
                    <IconButton name="account_balance" /><b>$ {account.balance}</b>
                    <br /><br /><br />
                </CardText>
                <CardActions border>
                    <div style={{ float: 'left', position: 'relative', margin: '0 10px'}}>
                        <div style={{ fontSize: '11px', margin: '0 auto', width: '100%', textAlign: 'center'}}><IconButton name="list" /></div>
                        <div style={{ fontSize: '11px', margin: '0 auto', width: '100%', textAlign: 'center'}}>Transactions</div>
                    </div>
                    <div style={{ float: 'left', position: 'relative', margin: '0 10px'}}>
                        <div style={{ fontSize: '11px', margin: '0 auto', width: '100%', textAlign: 'center'}}><IconButton name="input" /></div>
                        <div style={{ fontSize: '11px', margin: '0 auto', width: '100%', textAlign: 'center'}}>Deposit</div>
                    </div>
                    <div style={{ float: 'left', position: 'relative', margin: '0 10px'}}>
                        <div style={{ fontSize: '11px', margin: '0 auto', width: '100%', textAlign: 'center'}}><IconButton name="compare_arrows" /></div>
                        <div style={{ fontSize: '11px', margin: '0 auto', width: '100%', textAlign: 'center'}}>Transfer</div>
                    </div>
                    <div style={{ float: 'left', position: 'relative', margin: '0 10px'}}>
                        <div style={{ fontSize: '11px', margin: '0 auto', width: '100%', textAlign: 'center'}}><IconButton name="attach_money" /></div>
                        <div style={{ fontSize: '11px', margin: '0 auto', width: '100%', textAlign: 'center'}}>Pay Bills</div>
                    </div>
                    <div style={{ float: 'left', position: 'relative', margin: '0 10px'}}>
                        <div style={{ fontSize: '11px', margin: '0 auto', width: '100%', textAlign: 'center'}}><IconButton name="email" /></div>
                        <div style={{ fontSize: '11px', margin: '0 auto', width: '100%', textAlign: 'center'}}>EMT</div>
                    </div>
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
