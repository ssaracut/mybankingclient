import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { Menu, Sidebar } from 'semantic-ui-react'

import { SessionActions } from 'mybankingclientlib'
import './mainNav.css';

class MainNav extends Component {
  componentWillMount() {
    this.props.sessionActions.getStoredAuthData()
  }

  render() {
    return (
      <Sidebar as={Menu} animation='overlay' width='thin' visible={this.props.sidebarVisible} icon='labeled' vertical
               inverted>
        {this.props.session.nav.items.map(item => (
          <Menu.Item key={item.page} as={Link} to={item.page} onClick={this.props.toggleVisibility}>
            {item.label}
          </Menu.Item>
        ))}
      </Sidebar>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
