import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BankAccounts from '../components/BankAccounts'

import { SessionActions } from 'mybankingclientlib'

export class Accounts extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    if (!this.props.session.profile) {
      this.props.sessionActions.getProfile();
    }
  }

  render() {

    //if profile and for each bank render a BankAccounts tag
    return (
      <div>
        {
          this.props.session.profile &&
          Object.keys(this.props.session.profile.banks).map(key => (
            <BankAccounts key={key} bank={key} />
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return state.SessionReducer;
};

const mapDispatchToProps = function (dispatch) {
  return {
    sessionActions: bindActionCreators(SessionActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
