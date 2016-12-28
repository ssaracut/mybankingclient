import React from 'react'
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card'

class AccountsPage extends React.Component {
    render() {
        return (
            <Card shadow={0} style={{ width: '512px', margin: 'auto' }}>
                <CardTitle>Accounts</CardTitle>
                <CardText>
                    This page will show account information.
                </CardText>
            </Card>
        );
    }
}

export default AccountsPage;
