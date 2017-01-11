import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Card, Dimmer, Grid, Loader } from 'semantic-ui-react'

import AccountsActions from '../core/redux/accounts/AccountsActions'
import AccountTransactions from '../components/AccountTransactions'

class AccountsPage extends React.Component {
	componentWillMount() {
		this.handleOpenDialog = this.handleOpenDialog.bind(this);
		this.handleCloseDialog = this.handleCloseDialog.bind(this);

		if (this.props.accountState.accounts === null) {
			this.props.accountsActions.getAccounts();
		}
	}

	render() {
		if (this.props.accountState.accounts === null) {
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
					{/*<AccountTransactions accountState={this.props.accountState}*/}
															 {/*handleCloseDialog={this.handleCloseDialog}/>*/}
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
      <Grid columns={3} divided>
        <Grid.Row>{cells}</Grid.Row>
      </Grid>
		);
	}

	renderCell(account, handleOpenDialog) {
		return (
      <Grid.Column key={account.accountKey}>
        <Card>
          <Card.Content>
            <Card.Header>{account.name}</Card.Header>
            <Card.Meta>{account.number}</Card.Meta>
            <Card.Description>extra</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'>Approve</Button>
              <Button basic color='red'>Decline</Button>
            </div>
          </Card.Content>
        </Card>
      </Grid.Column>

      // <Grid.Column key={account.accountKey}>
      //   <Card>
      //     <Card.Content>
      //       <Image floated='right' size='mini' src='http://semantic-ui.com/images/avatar/large/steve.jpg' />
      //       <Card.Header>{account.name}</Card.Header>
      //       <Card.Meta>{account.number}</Card.Meta>
      //       <Card.Description>
      //         Steve wants to add you to the group <strong>best friends</strong>
      //       </Card.Description>
      //     </Card.Content>
      //     <Card.Content extra>
      //       <div className='ui two buttons'>
      //         <Button basic color='green'>Approve</Button>
      //         <Button basic color='red'>Decline</Button>
      //       </div>
      //     </Card.Content>
      //   </Card>
      // </Grid.Column>

			// <Cell col={4} key={account.accountKey}>
			// 	<Card shadow={0} className="accountCardAccount">
			// 		<CardText>
			// 			<b>{account.name}</b>
			// 			<br />{account.number}
			// 			<br /><br />
			// 			<Tooltip label="Balance">
			// 				<Chip onClick={() => handleOpenDialog(account.detailLink)}>
			// 					<ChipContact className="mdl-color--teal mdl-color-text--white"><i
			// 						className="material-icons accountChipContact">account_balance</i></ChipContact>
			// 					$ {account.balance} <b>{account.currency}</b>
			// 				</Chip>
			// 			</Tooltip>
			// 			<br /><br /><br />
			// 		</CardText>
			// 		<CardActions border>
			// 			<div className="accountCardActionsDiv">
			// 				<div className="accountCardActionAlign"><IconButton name="list"/></div>
			// 				<div className="accountCardActionAlign">Trans.</div>
			// 			</div>
			// 			<div className="accountCardActionsDiv">
			// 				<div className="accountCardActionAlign"><IconButton name="photo_camera"/></div>
			// 				<div className="accountCardActionAlign">Deposit</div>
			// 			</div>
			// 			<div className="accountCardActionsDiv">
			// 				<div className="accountCardActionAlign"><IconButton name="compare_arrows"/></div>
			// 				<div className="accountCardActionAlign">Transfer</div>
			// 			</div>
			// 			<div className="accountCardActionsDiv">
			// 				<div className="accountCardActionAlign"><IconButton name="attach_money"/></div>
			// 				<div className="accountCardActionAlign">Pay Bills</div>
			// 			</div>
			// 			<div className="accountCardActionsDiv">
			// 				<div className="accountCardActionAlign"><IconButton name="send"/></div>
			// 				<div className="accountCardActionAlign">Send</div>
			// 			</div>
			// 		</CardActions>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountsPage);
