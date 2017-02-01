import React, { Component } from 'react'
import { Button, List, Modal } from 'semantic-ui-react'

import './accountTransactions.css';

class AccountTransactions extends Component {
  componentWillMount() {
    this.renderTransactionsListCell = this.renderTransactionsListCell.bind(this);
  }

  render() {
    return (
      <Modal size='large' open={this.props.accountState.openDialog} onClose={this.close}
        onClick={this.props.handleCloseDialog}>
        <Modal.Header>
          Transactions
          <Button circular className="accountTransactionsButtonRemove" size="mini"
            onClick={this.props.handleCloseDialog} icon='remove' />
        </Modal.Header>
        <Modal.Content>
          {this.renderTransactionsList(this.props.accountState.accountTransactions)}
          {!this.props.accountState.accountTransactions &&            
            <p>There is no transaction history available for this account.</p>
          }
        </Modal.Content>
        <Modal.Actions>

        </Modal.Actions>
      </Modal>
    );
  }

  renderTransactionsList(accountTransactions) {
    var list = [];

    if (accountTransactions) {
      for (var i = 0; i < accountTransactions.length; i++) {
        list.push(this.renderTransactionsListCell(accountTransactions[i]))
      }
    }

    return (
      <List divided verticalAlign='middle'>{list}</List>
    );
  }

  renderTransactionsListCell(transaction) {
    return (
      <List.Item key={transaction.id}>
        <List.Content floated='right'>
          <div>{this.checkTransactionType(transaction)}</div>
        </List.Content>
        <List.Content>
          <div><b>{transaction.description}</b></div>
          <div>{transaction.date}</div>
        </List.Content>
      </List.Item>
    )
  }

  checkTransactionType(transaction) {
    if (transaction.expense === true) {
      return (
        <div>{this.transactionTypeExpense(transaction)}</div>
      );
    } else {
      return (
        <div>{this.transactionTypeIncome(transaction)}</div>
      );
    }
  }

  transactionTypeExpense(transaction) {
    return (
      <div className="accountTransactionsExpense">{transaction.amount}</div>
    );
  }

  transactionTypeIncome(transaction) {
    return (
      <div className="accountTransactionsIncome">{transaction.amount}</div>
    );
  }
}

export default AccountTransactions;
