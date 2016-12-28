import React from 'react'
import { Card, CardTitle, CardText } from 'react-mdl/lib/Card'

class HomePage extends React.Component {
  render() {
    return (
      <Card shadow={0} style={{ width: '512px', margin: 'auto' }}>
        <CardTitle>Welcome To My Banking Client</CardTitle>
        <CardText  style={{ height: '176px' }}>
          This is an example Banking Client that aggregates banking APIs from multiple institutions.
          <br />
          <br />
          Some of the links of the menu will require authentication, please visit the project README at
          'Some Link Here' to view the table of users and their institutions.
        </CardText>
      </Card>
    );
  }
}

export default HomePage;
