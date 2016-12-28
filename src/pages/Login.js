import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Card, CardTitle, CardText } from 'react-mdl/lib/Card'

import SessionActions from '../core/redux/session/SessionActions'

class LoginPage extends React.Component {
    componentWillMount() {
        if (!this.props.session.loggedIn) {
            this.props.sessionActions.login();
        }
    }

    render() {
        return (
            <Card shadow={0} style={{ width: '512px', margin: 'auto' }}>
                <CardTitle>Logining into My Banking Client</CardTitle>
                <CardText  style={{ height: '176px' }}>
                    This will be a login form one day.
                </CardText>
            </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);