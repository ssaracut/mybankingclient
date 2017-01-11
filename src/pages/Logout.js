import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import SessionActions from '../core/redux/session/SessionActions'

class LogoutPage extends React.Component {
  componentWillMount() {
    this.props.sessionActions.logout();
  }

  render() {
    return (
      <div></div>
      // <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
      //   <CardTitle>Logging out of My Banking Client</CardTitle>
      //   <CardText style={{height: '176px'}}>
      //     This will display logout information one day.
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);