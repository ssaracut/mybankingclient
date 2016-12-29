import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from './accounts.css';

import { Card, CardActions, CardMenu, CardText } from 'react-mdl/lib/Card'
import { Button, Cell, Chip, ChipContact, Dialog, DialogTitle, DialogContent, DialogActions, Grid, IconButton, Menu, MenuItem, Spinner, Tooltip } from 'react-mdl/lib';

import AccountsActions from '../core/redux/accounts/AccountsActions'

class AccountsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }
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
                <div style={{width: '90%', margin: 'auto'}}>
                    {renderGrid(this.props.accounts, this.handleOpenDialog)}
                    <div>
                        <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog}>
                            <DialogTitle>Allow data collection?</DialogTitle>
                            <DialogContent>
                                <p>Allowing us to collect data will let us get you the information you want faster.</p>
                            </DialogContent>
                            <DialogActions>
                                <Button type='button'>Agree</Button>
                                <Button type='button' onClick={this.handleCloseDialog}>Disagree</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            );
        }
    }

    handleOpenDialog() {
        this.setState({
            openDialog: true
        });
    }

    handleCloseDialog() {
        this.setState({
            openDialog: false
        });
    }
}

const renderGrid = function(accounts, handleOpenDialog) {
    var cells = [];

    for (var i = 0; i < accounts.length; i++) {
        cells.push(renderCell(accounts[i], handleOpenDialog))
    }

    return (
        <Grid className="">{cells}</Grid>
    );
}

const renderCell = function(account, handleOpenDialog) {
    return (
        <Cell col={4} key={account.accountKey}>
            <Card shadow={0} className="cardAccount">
                <CardText>
                    <b>{account.name}</b>
                    <br />{account.number}
                    <br /><br />
                    <Tooltip label="Balance">
                        <Chip onClick={handleOpenDialog}>
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
