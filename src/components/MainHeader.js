import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { Icon, Menu } from 'semantic-ui-react'

import { SessionActions } from 'mybankingclientlib'
import './mainHeader.css';

class MainHeader extends Component {
  componentWillMount() {
    this.state = {activeItem: 'home'};
    this.props.sessionActions.getStoredAuthData()
  }

  render() {
    const {activeItem} = this.state
    const contextRoot = process.env.REACT_APP_PUBLIC_URL === '/' ? '/' : `/${process.env.REACT_APP_PUBLIC_URL}/`

    return (
      <Menu inverted className="mainHeaderMenu">
        <Menu.Item name='home' className="mainHeaderMenuItem" onClick={this.props.toggleVisibility}>
          <Icon name='bars'/>
        </Menu.Item>
        <Menu.Menu position='right'>
          {this.props.session.options.map(option => (
            <Menu.Item key={option.page} name='Authentication' active={activeItem === 'authentication'}
                       className="authentication">
              <Link key={option.page} to={`${contextRoot}${option.page}`}>{option.label}</Link>
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
