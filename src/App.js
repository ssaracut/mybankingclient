import React, { Component } from 'react';
import {Layout, Header, Navigation, Drawer, Content, Button} from 'react-mdl';

import BbvaApi from './core/utils/BbvaApi';

class App extends Component {
  render() {

    function LoginBBVA() {
      let location = encodeURI('https://localhost:3000/bbva');
      window.location.href = `https://connect.bbva.com/token/authorize?client_id=app.bbva.mynewapp&response_type=code&redirect_uri=${location}`;
    }

    function GetBBVAAccounts() {
      BbvaApi.getAccounts();
    }

    function LoginCiti() {
      let location = encodeURI('https://localhost:3000/citi');
      window.location.href = `https://sandbox.apihub.citi.com/gcb/api/authCode/oauth2/authorize?response_type=code&client_id=a12b4efd-d529-416a-ab19-37585d54b0a3&scope=accounts_details_transactions&countryCode=AU&businessCode=GCB&locale=en_US&state=12345&redirect_uri=${location}`;
    }

    return (
      <Layout style={{ background: 'url(https://www.getmdl.io/assets/demos/transparent.jpg) center / cover' }}>
        <Header transparent title="My Banking Client" style={{ color: 'white' }}>
          {/*
          <Navigation>
            <a href="">Link</a>
            <a href="">Link</a>
            <a href="">Link</a>
            <a href="">Link</a>
          </Navigation>
        */}
        </Header>
        <Drawer title="My Banking Client">
          <Navigation>
            <a href="/">Home</a>
            <a href="/accounts">Accounts</a>
            <a href="">Link</a>
            <a href="">Link</a>
          </Navigation>
        </Drawer>
        <Content>
          <Button raised colored onClick={LoginBBVA}>Login BBVA</Button>
          <br/>
          <br/>
          <Button raised colored onClick={LoginCiti}>Login Citi</Button>
          <br/>
          <br/>
          <Button raised colored onClick={GetBBVAAccounts}>Get BBVA Accounts</Button>
          {this.props.children}
        </Content>
      </Layout>);
  }
}

export default App;
