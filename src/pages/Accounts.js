import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './accounts.css';

import { Card, CardActions, CardMenu, CardTitle, CardText } from 'react-mdl/lib/Card'
import { Cell, Chip, ChipContact, Grid, IconButton, Menu, MenuItem, Spinner, Tooltip } from 'react-mdl/lib';

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
            <Card shadow={0} className="cardAccount">
                <CardText>
                    <b>{account.name}</b>
                    <br />{account.number}
                    <br /><br />
                    <Tooltip label="Balance">
                        <Chip onClick={e => { alert('Clicked!'); }}>
                            <ChipContact className="mdl-color--teal mdl-color-text--white"><i className="material-icons chipContact">account_balance</i></ChipContact>
                            $ {account.balance}
                        </Chip>
                    </Tooltip>
                    <br /><br /><br />
                </CardText>
                <CardActions border>
                    <div className="cardActionsDiv">
                        <div className="cardActionAlign"><IconButton name="list" /></div>
                        <div className="cardActionAlign">Transactions</div>
                    </div>
                    <div className="cardActionsDiv">
                        <div className="cardActionAlign"><IconButton name="input" /></div>
                        <div className="cardActionAlign">Deposit</div>
                    </div>
                    <div className="cardActionsDiv">
                        <div className="cardActionAlign"><IconButton name="compare_arrows" /></div>
                        <div className="cardActionAlign">Transfer</div>
                    </div>
                    <div className="cardActionsDiv">
                        <div className="cardActionAlign"><IconButton name="attach_money" /></div>
                        <div className="cardActionAlign">Pay Bills</div>
                    </div>
                    <div className="cardActionsDiv">
                        <div className="cardActionAlign"><IconButton name="email" /></div>
                        <div className="cardActionAlign">EMT</div>
                    </div>
                </CardActions>
                <CardMenu className="cardMenuAccount">
                    <IconButton name="more_vert" id={'account_' + account.accountKey} />
                    <Menu target={'account_' + account.accountKey} align="right">
                        <MenuItem>Print Void Cheque</MenuItem>
                        <MenuItem>Pre-Authorized Payments</MenuItem>
                        <MenuItem>Rewards</MenuItem>
                    </Menu>
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
