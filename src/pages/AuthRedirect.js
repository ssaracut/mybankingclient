import React from 'react'
import { browserHistory  } from 'react-router'

import { Card, CardTitle, CardText } from 'react-mdl/lib/Card'

import BbvaApi from '../core/utils/BbvaApi'

class AuthRedirect extends React.Component {
    componentWillMount() {
        let currentLocation = this.props.router.getCurrentLocation();
        let code = currentLocation.query.code;
        if (currentLocation.pathname === '/bbva') {
            BbvaApi.getAuthToken(code).then(function () {
                browserHistory.push('/profiles');
            });
        } else if (currentLocation.pathname === '/citi') {
            //CitiApi.GetAuthToken(code);
        }
    }

    render() {
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
