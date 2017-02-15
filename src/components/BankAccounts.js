import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Card, Dimmer, Grid, Loader, Popup } from 'semantic-ui-react'

import { AccountsActions } from 'mybankingclientlib'
import AccountTransactions from '../components/AccountTransactions'
import './bankAccounts.css';

export class Accounts extends Component {
  componentWillMount() {
    const bank = this.props.bank;
    if (!this.props.accountState.accounts || !this.props.accountState.accounts[bank]) {
      this.props.accountsActions.getBankAccounts(bank);
    }
  }

  render() {
    if (!this.props.accountState.accounts) {
      return (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      );
    }
    else {
      return (
        <div className="account">
          {this.renderGrid(this.props.accountState.accounts[this.props.bank])}
        </div>
      );
    }
  }

  renderGrid(accounts, handleOpenDialog) {
    var cells = [];

    if (accounts) {
      for (var i = 0; i < accounts.length; i++) {
        cells.push(this.renderCell(accounts[i], handleOpenDialog))
      }
    }

    return (
      <Grid stackable columns={3}>
        <Grid.Row>{cells}</Grid.Row>
      </Grid>
    );
  }

  renderCell(account) {

    function handleOpenDialog(detailLink) {
      this.props.accountsActions.getAccountTransactions(detailLink);
      this.props.accountsActions.getDialogHandler(true);
    }

    return (
      <Grid.Column key={account.accountKey}>
        <Card color='blue'>
          <Card.Content>
            <Card.Header>{account.name}</Card.Header>
            <Card.Meta>{account.number}</Card.Meta>
            <Card.Description className="accountCardDescription">
              <Popup
                trigger={
                  <Button
                    size="mini"
                    floated='right'
                    color='blue'
                    content=''
                    icon='dollar'
                    label={{ as: 'a', basic: true, color: 'blue', pointing: 'left', content: account.balance }}
                    onClick={() => handleOpenDialog(account.detailLink)}
                    />
                }
                positioning='bottom center'
                content='Click to see transactions'
                inverted
                />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="accountCardContent">
              <Button circular size='mini' icon='photo' /><br /> Deposit
            </div>
            <div className="accountCardContent">
              <Button circular size='mini' icon='exchange' /><br /> Transfer
            </div>
            <div className="accountCardContent">
              <Button circular size='mini' icon='list' /><br /> Pay Bills
            </div>
            <div className="accountCardContent">
              <Button circular size='mini' icon='send' /><br /> Send
            </div>
          </Card.Content>
        </Card>
        <br />
      </Grid.Column>

    );
  }
}

const mapStateToProps = function (state) {
  return state.AccountsReducer
};

const mapDispatchToProps = function (dispatch) {
  return {
    accountsActions: bindActionCreators(AccountsActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
