import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Header, Segment } from 'semantic-ui-react'

import { SessionActions } from 'mybankingclientlib'

export class Logout extends React.Component {
  componentWillMount() {
    this.props.sessionActions.logout();
  }

  render() {
    return (
      <div>
        <Segment id="Logout">
          <Header as='h1'>Logged out of My Banking Client</Header>
          <p>This text may have something more relevant one day.</p>
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
