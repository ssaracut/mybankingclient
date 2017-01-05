import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from 'react-mdl';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card'

import SessionActions from '../core/redux/session/SessionActions'

class ProfilesPage extends React.Component {
    componentWillMount() {
        if (!this.props.session.profile) {
            this.props.sessionActions.getProfile();
        }
    }

    render() {
        function LoginBBVA() {
            let location = encodeURI('https://localhost:3000/bbva');
            window.location.href = `https://connect.bbva.com/token/authorize?client_id=app.bbva.mynewapp&response_type=code&redirect_uri=${location}`;
        }

        function LoginCiti() {
            let location = encodeURI('https://localhost:3000/citi');
            window.location.href = `https://sandbox.apihub.citi.com/gcb/api/authCode/oauth2/authorize?response_type=code&client_id=a12b4efd-d529-416a-ab19-37585d54b0a3&scope=accounts_details_transactions&countryCode=AU&businessCode=GCB&locale=en_US&state=12345&redirect_uri=${location}`;
        }
        return (
            <div>
                <Card shadow={0} style={{ width: '512px', margin: 'auto' }}>
                    <CardTitle>My Banking Profile</CardTitle>
                    <CardText style={{ height: '176px' }}>
                        This is where you can set profile information (show customer profile, and set which api's to enable, when an api is enabled show the countdown for the auth and refresh tokens)
                        <br /><br />
                        <Button raised colored onClick={LoginBBVA}>Login BBVA</Button>
                        <Button raised colored onClick={LoginCiti}>Login Citi</Button>
                    </CardText>
                </Card>
                {
                    this.props.session.profile &&
                    Object.entries(this.props.session.profile.banks).map(value => (
                        <Card key={value[0]} shadow={0} style={{ width: '512px', margin: 'auto', marginTop: '20px' }}>
                            <CardTitle>{value[0]} Profile</CardTitle>
                            <CardText style={{ height: '176px' }}>
                                <p>Bank specific profile info.</p>
                                <br />
                                <p>firstname: {value[1].firstname}</p>
                                <p>lastname: {value[1].lastname}</p>
                            </CardText>
                        </Card>))
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesPage);