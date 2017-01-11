import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

import './home.css';

class HomePage extends React.Component {
  render() {
    return (
      <Segment compact id="home">
        <Header as='h1'>Welcome to the Banking Client</Header>
        <p>This is an example Banking Client that aggregates banking APIs from multiple institutions.</p>
        <p>Some of the links of the menu will require authentication, please visit the project README at 'Some Link Here' to view the table of users and their institutions.</p>
      </Segment>
    );
  }
}

export default HomePage;
