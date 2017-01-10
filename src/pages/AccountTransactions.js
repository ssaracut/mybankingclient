import React from 'react'
import { Button } from 'react-mdl/lib'
import { Dialog, DialogContent, DialogActions, List, ListItem } from 'react-mdl/lib'
import './accountTransactions.css';

class AccountTransactions extends React.Component {
    render() {
        return (
            <Dialog open={this.props.accountState.openDialog} onCancel={this.props.handleCloseDialog} className="accountTransactionsDialog">
                <DialogContent>
                    <div className="accountTransactionsDialogContentDiv">{renderTransactionsList(this.props.accountState.accountTransactions)}</div>
                </DialogContent>
                <DialogActions>
                    <Button type='button' onClick={this.props.handleCloseDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const renderTransactionsList = function(accountTransactions) {
    var list = [];

    if (accountTransactions) {
        accountTransactions.forEach(function (transaction) {
            list.push(renderTransactionsListCell(transaction))
        })
    }

    return (
        <List>{list}</List>
    );
}

const renderTransactionsListCell = function(transaction) {
    return (
        <ListItem key={transaction.id}>
            <div className="accountTransactionsListItemDiv">
                <div className="accountTransactionsListItemDescription"><b>{transaction.description}</b></div>
                <div className="accountTransactionsListItemDate">{transaction.date}</div>
                <div className="accountTransactionsListItemOther">{checkTransactionType(transaction)}</div>
            </div>
        </ListItem>
    );
}

const checkTransactionType = function(transaction) {
    if (transaction.expense === true) {
        return (
            <div>{transactionTypeExpense(transaction)}</div>
        );
    } else {
        return (
            <div>{transactionTypeIncome(transaction)}</div>
        );
    }
}

const transactionTypeExpense = function(transaction) {
    return (
        <div className="accountTransactionsExpense">{transaction.amount}</div>
    );
}

const transactionTypeIncome = function(transaction) {
    return (
        <div className="accountTransactionsIncome">{transaction.amount}</div>
    );
}

export default AccountTransactions;