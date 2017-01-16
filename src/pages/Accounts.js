import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Card, Dimmer, Grid, Icon, Loader, Popup} from 'semantic-ui-react'

import { AccountsActions } from 'mybankingclientlib'
import AccountTransactions from '../components/AccountTransactions'
import './accounts.css';

class AccountsPage extends Component {
	componentWillMount() {
		this.handleOpenDialog = this.handleOpenDialog.bind(this);
		this.handleCloseDialog = this.handleCloseDialog.bind(this);

		if (!this.props.accountState.accounts) {
			this.props.accountsActions.getAccounts();
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
					{this.renderGrid(this.props.accountState.accounts, this.handleOpenDialog)}
					<AccountTransactions accountState={this.props.accountState} handleCloseDialog={this.handleCloseDialog}/>
				</div>
			);
		}
	}

	handleOpenDialog(detailLink) {
		this.props.accountsActions.getAccountTransactions(detailLink);
		this.props.accountsActions.getDialogHandler(true);
	}

	handleCloseDialog() {
		this.props.accountsActions.getDialogHandler(false);
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

	renderCell(account, handleOpenDialog) {
		return (
			<Grid.Column key={account.accountKey} mobile={16} tablet={8} computer={4}>
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
                    label={{as: 'a', basic: true, color: 'blue', pointing: 'left', content: account.balance}}
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
							<Icon name="photo"/>
							<div>Deposit</div>
						</div>
						<div className="accountCardContent">
							<Icon name="exchange"/>
							<div>Transfer</div>
						</div>
						<div className="accountCardContent">
							<Icon name="list"/>
							<div>Pay Bills</div>
						</div>
						<div className="accountCardContent">
							<Icon name="send"/>
							<div>Send</div>
						</div>
					</Card.Content>
				</Card>
			</Grid.Column>

			// <Cell col={4} key={account.accountKey}>
			// 	<Card shadow={0} className="accountCardAccount">
			// 		<CardMenu className="accountCardMenu">
			// 			<IconButton name="more_vert" id={'account_' + account.accountKey}/>
			// 			<Menu target={'account_' + account.accountKey} align="right">
			// 				<MenuItem>Print Void Cheque</MenuItem>
			// 				<MenuItem>Pre-Authorized Payments</MenuItem>
			// 				<MenuItem>Rewards</MenuItem>
			// 			</Menu>
			// 		</CardMenu>
			// 	</Card>
			// </Cell>
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

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);
