import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'

import { SessionActions } from 'mybankingclientlib'

class LoginPage extends React.Component {
  componentWillMount() {
    //just faking a successful login at this point
    if (!this.props.session.loggedIn) {
      this.props.sessionActions.login()
        .then(function () {
          this.props.sessionActions.getProfile().then(function () {
            browserHistory.push('');
          })
        }.bind(this));
    }
  }

  render() {
    return (
      <div></div>
      // <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
      //   <CardTitle>Logining into My Banking Client</CardTitle>
      //   <CardText style={{height: '176px'}}>
      //     This will be a login form one day.
      //   </CardText>
      // </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
