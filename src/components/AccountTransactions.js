import React from 'react'

import './accountTransactions.css';

class AccountTransactions extends React.Component {
  render() {
    return (
      <div></div>
      // <Dialog open={this.props.accountState.openDialog} onCancel={this.props.handleCloseDialog}
      //         className="accountTransactionsDialog">
      //   <DialogContent>
      //     <div
      //       className="accountTransactionsDialogContentDiv">{this.renderTransactionsList(this.props.accountState.accountTransactions)}</div>
      //   </DialogContent>
      //   <DialogActions>
      //     <Button type='button' onClick={this.props.handleCloseDialog}>Close</Button>
      //   </DialogActions>
      // </Dialog>
    );
  }

  renderTransactionsList(accountTransactions) {
    var list = [];

    if (accountTransactions) {
      accountTransactions.forEach(function (transaction) {
        list.push(this.renderTransactionsListCell(transaction))
      })
    }

    return (
      <div></div>
      // <List>{list}</List>
    );
  }

  renderTransactionsListCell(transaction) {
    return (
      <div></div>
      // <ListItem key={transaction.id}>
      //   <div className="accountTransactionsListItemDiv">
      //     <div className="accountTransactionsListItemDescription"><b>{transaction.description}</b></div>
      //     <div className="accountTransactionsListItemDate">{transaction.date}</div>
      //     <div className="accountTransactionsListItemOther">{this.checkTransactionType(transaction)}</div>
      //   </div>
      // </ListItem>
    );
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
