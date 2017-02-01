import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import { Header, Segment } from 'semantic-ui-react'

import { SessionActions } from 'mybankingclientlib'

export class AuthRedirect extends React.Component {
  componentWillMount() {
    const contextRoot = process.env.REACT_APP_PUBLIC_URL === '/' ? '/' : `/${process.env.REACT_APP_PUBLIC_URL}/`;
    const host = window.location.host;
    const currentLocation = this.props.router.getCurrentLocation();
    const splitPath = currentLocation.pathname.split("/");
    const api = splitPath[splitPath.length - 1];
    const code = currentLocation.query.code;
    this.props.sessionActions.getApiAuthToken(api, code, `https://${host}${contextRoot}${api}`)
      .then(function () {
        browserHistory.push(`${contextRoot}profiles`);
      })
  }

  render() {
    return (
      <div>
        <Segment id="AuthRedirect">
          <Header as='h1'>Returning...</Header>
          <p>Completing Authentication</p>
        </Segment>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRedirect);
