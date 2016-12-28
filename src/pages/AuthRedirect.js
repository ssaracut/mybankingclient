import React from 'react'

import BbvaApi from '../core/utils/BbvaApi'

class AuthRedirect extends React.Component {
    render() {
        let currentLocation = this.props.router.getCurrentLocation();
        let code = currentLocation.query.code;

        if(currentLocation.pathname === '/bbva'){
            BbvaApi.GetAuthToken(code);
        }

        return (
            <div>Completing Authentication</div>
        );
    }
}

export default AuthRedirect;
