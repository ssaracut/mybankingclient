import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

import './mainHeader.css';

class MainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {activeItem: 'home'};
  }

  handleItemClick = (e, {name}) => this.setState({activeItem: name})

  render() {
    const {activeItem} = this.state

    return (
      <Menu inverted className="mainHeaderMenu">
        <Menu.Item name='home' active={activeItem === 'home'} onClick={this.props.toggleVisibility}>
          <Icon name='bars' />
        </Menu.Item>
        <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick}/>
        <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick}/>
      </Menu>
    );
  }
}

export default MainHeader
