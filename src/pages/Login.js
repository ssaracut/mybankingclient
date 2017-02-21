import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Segment, Header } from 'semantic-ui-react'

import { SessionActions } from 'mybankingclientlib'

export class Login extends React.Component {
  componentWillMount() {
    //just faking a successful login at this point
    if (!this.props.session.loggedIn) {
      this.props.sessionActions.login();
    }
  }

  render() {
    const contextRoot = process.env.REACT_APP_PUBLIC_URL === '/' ? '/' : `/${process.env.REACT_APP_PUBLIC_URL}/`;
    const host = window.location.host;

    function LoginGoogle() {
      let location = encodeURI(`https://${host}${contextRoot}api/login/google`);
      //let location = encodeURI('http://localhost:8080/api/login')
      window.location.href = `${location}`;
    }
    return (
      <div>
        <Segment id="Login">
          <Header as='h1'>Login to MyBankingClient</Header>
          <p>Enter username and password:</p>
          <p>or login with one of the following:</p>
          <Button onClick={LoginGoogle} negative>Login Google</Button>
        </Segment>
      </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
