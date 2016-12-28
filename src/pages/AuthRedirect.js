import React from 'react'
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card'

import BbvaApi from '../core/utils/BbvaApi'

class AuthRedirect extends React.Component {
    render() {
        let currentLocation = this.props.router.getCurrentLocation();
        let code = currentLocation.query.code;

        if (currentLocation.pathname === '/bbva') {
            BbvaApi.getAuthToken(code);
        } else if (currentLocation.pathname === '/citi') {
            //CitiApi.GetAuthToken(code);
        }

        return (
            <Card style={{ margin: "0 auto", marginTop: "30px", width: '80%' }}>
                <CardTitle>Returning...</CardTitle>
                <CardText>
                    <div>Completing Authentication</div>
                </CardText>
            </Card>
        );
    }
}

export default AuthRedirect;
