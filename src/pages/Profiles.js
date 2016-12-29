import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Button } from 'react-mdl';
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card'

class ProfilesPage extends React.Component {
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
            <Card shadow={0} style={{ width: '512px', margin: 'auto' }}>
                <CardTitle>Banking Profiles</CardTitle>
                <CardText  style={{ height: '176px' }}>
                    This is where you can set profile information (show customer profile, and set which api's to enable, when an api is enabled show the countdown for the auth and refresh tokens)
                    <br/><br/>
                    <Button raised colored onClick={LoginBBVA}>Login BBVA</Button>
                    <Button raised colored onClick={LoginCiti}>Login Citi</Button>
                </CardText>
            </Card>
        );
    }
}

export default ProfilesPage;