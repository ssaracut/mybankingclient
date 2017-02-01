import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

export default class NoMatch extends React.Component {
  render() {
    return (
      <div>
        <Segment id="NoMatch">
          <Header as='h1'>Uh Oh...</Header>
          <p>The page you have selected does not exist.</p>
        </Segment>
      </div>
    );
  }
}
