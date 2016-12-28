import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Card, CardTitle, CardText } from 'react-mdl/lib/Card'

class ProfilePage extends React.Component {
    render() {
        return (
            <Card shadow={0} style={{ width: '512px', margin: 'auto' }}>
                <CardTitle>Profile Settings</CardTitle>
                <CardText  style={{ height: '176px' }}>
                    This is where you can set profile information (show customer profile, and set which api's to enable, when an api is enabled show the countdown for the auth and refresh tokens)
                </CardText>
            </Card>
        );
    }
}

export default ProfilePage;