import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl'

import SessionActions from './core/redux/session/SessionActions'

class App extends Component {
  render() {
    return (
      <Layout style={{ background: 'url(https://www.getmdl.io/assets/demos/transparent.jpg) center / cover' }}>
        <Header transparent title="My Banking Client" style={{ color: 'white' }}>
          <Navigation>
            {this.props.session.options.map(option => (
              <Link key={ option.page } to={ option.page }>{ option.label }</Link>
            )) }
          </Navigation>
        </Header>
        <Drawer title="My Banking Client">
          <Navigation>
            {this.props.session.nav.items.map(item => (
              <Link key={ item.page } to={ item.page }>{ item.label }</Link>
            )) }
          </Navigation>
        </Drawer>
        <Content>
          { this.props.children }
        </Content>
      </Layout>);
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

export default connect(mapStateToProps, mapDispatchToProps)(App);