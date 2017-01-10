import React, { Component } from 'react';
import { Icon, Menu, Sidebar } from 'semantic-ui-react';

import './mainHeader.css';

class MainNav extends Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    return (
      <Sidebar as={Menu} animation='overlay' width='thin' visible={this.props.sidebarVisible} icon='labeled' vertical inverted>
        <Menu.Item name='home'>
          <Icon name='home'/>
          Real Estate
        </Menu.Item>
        <Menu.Item name='gamepad'>
          <Icon name='gamepad'/>
          Games
        </Menu.Item>
        <Menu.Item name='camera'>
          <Icon name='camera'/>
          Channels
        </Menu.Item>
      </Sidebar>
    );
  }
}

export default MainNav