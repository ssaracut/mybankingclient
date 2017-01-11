import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'

<<<<<<< HEAD
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card'

import { SessionActions } from 'mybankingclientlib'
=======
import SessionActions from '../core/redux/session/SessionActions'
>>>>>>> Refactor-Design

class AuthRedirect extends React.Component {
  componentWillMount() {
    const currentLocation = this.props.router.getCurrentLocation();
    const api = currentLocation.pathname.substr(1, currentLocation.pathname.length);
    const code = currentLocation.query.code;
    this.props.sessionActions.getApiAuthToken(api, code)
      .then(function () {
        browserHistory.push('/profiles');
      })
  }

  render() {
    return (
<<<<<<< HEAD
      <Card style={{ margin: "0 auto", marginTop: "30px", width: '80%' }}>
        <CardTitle>Returning...</CardTitle>
        <CardText>
          <div>Completing Authentication</div>
        </CardText>
      </Card>
=======
      <div></div>
      // <Card style={{margin: "0 auto", marginTop: "30px", width: '80%'}}>
      //   <CardTitle>Returning...</CardTitle>
      //   <CardText>
      //     <div>Completing Authentication</div>
      //   </CardText>
      // </Card>
>>>>>>> Refactor-Design
    );
  }
}

const mapStateToProps = function (state) {
  return state.SessionReducer;
};

const mapDispatchToProps = function (dispatch) {
  return {
    sessionActions: bindActionCreators(SessionActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect);
