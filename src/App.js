import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Layout, Header, Navigation, Drawer, Content, Button} from 'react-mdl';

import SessionActions from './core/redux/session/SessionActions'

class App extends Component {
  render() {

    function LoginBBVA() {
      let location = encodeURI('https://localhost:3000/bbva');
      window.location.href = `https://connect.bbva.com/token/authorize?client_id=app.bbva.mynewapp&response_type=code&redirect_uri=${location}`;
    }

    function LoginCiti() {
      let location = encodeURI('https://localhost:3000/citi');
      window.location.href = `https://sandbox.apihub.citi.com/gcb/api/authCode/oauth2/authorize?response_type=code&client_id=a12b4efd-d529-416a-ab19-37585d54b0a3&scope=accounts_details_transactions&countryCode=AU&businessCode=GCB&locale=en_US&state=12345&redirect_uri=${location}`;
    }

    return (
      <Layout style={{ background: 'url(https://www.getmdl.io/assets/demos/transparent.jpg) center / cover' }}>
        <Header transparent title="My Banking Client" style={{ color: 'white' }}>
          <Navigation>
            {this.props.session.options.map(option => (
              <a key={option.page} href={ option.page }>{option.label}</a>
            )) }
          </Navigation>
        </Header>
        <Drawer title="My Banking Client">
          <Navigation>
            <a href="/">Home</a>
            <a href="/accounts">Accounts</a>
            <a href="/profile">Profile</a>
          </Navigation>
        </Drawer>
        <Content>
          <Button raised colored onClick={LoginBBVA}>Login BBVA</Button>
          <br/>
          <br/>
          <Button raised colored onClick={LoginCiti}>Login Citi</Button>
          <br/>
          <br/>
          {this.props.children}
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