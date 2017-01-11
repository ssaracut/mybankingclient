import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { Icon, Menu } from 'semantic-ui-react'

import SessionActions from '../core/redux/session/SessionActions'
import './mainHeader.css';

class MainHeader extends Component {
  componentWillMount() {
    this.state = {activeItem: 'home'};
    this.props.sessionActions.getStoredAuthData()
  }

  render() {
    const {activeItem} = this.state

    return (
      <Menu inverted className="mainHeaderMenu">
        <Menu.Item name='home' className="mainHeaderMenuItem" onClick={this.props.toggleVisibility}>
          <Icon name='bars'/>
        </Menu.Item>
        <Menu.Menu position='right'>
          {this.props.session.options.map(option => (
            <Menu.Item key={option.page} name='Authentication' active={activeItem === 'authentication'} className="authentication">
              <Link key={option.page} to={option.page}>{option.label}</Link>
            </Menu.Item>
          ))}
        </Menu.Menu>
      </Menu>
    );
  }
}

const mapStateToProps = function (state) {
  return state.SessionReducer;
};

const mapDispatchToProps = function (dispatch) {
  return {
    sessionActions: bindActionCreators(SessionActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
