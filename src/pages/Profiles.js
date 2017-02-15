import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Header, Segment } from 'semantic-ui-react'

import { SessionActions } from 'mybankingclientlib'

export class Profiles extends React.Component {
  componentWillMount() {
    if (!this.props.session.profile) {
      this.props.sessionActions.getProfile();
    }
  }

  render() {
    const contextRoot = process.env.REACT_APP_PUBLIC_URL === '/' ? '/' : `/${process.env.REACT_APP_PUBLIC_URL}/`;
    const host = window.location.host;

    function LoginBBVA() {
      let location = encodeURI(`https://${host}${contextRoot}bbva`);
      window.location.href = `https://connect.bbva.com/token/authorize?client_id=app.bbva.mynewapp&response_type=code&redirect_uri=${location}`;
    }

    function LoginCiti() {
      let location = encodeURI(`https://${host}${contextRoot}citi`);
      window.location.href = `https://sandbox.apihub.citi.com/gcb/api/authCode/oauth2/authorize?response_type=code&client_id=a12b4efd-d529-416a-ab19-37585d54b0a3&scope=accounts_details_transactions customers_profiles&countryCode=US&businessCode=GCB&locale=en_US&state=12345&redirect_uri=${location}`;
    }

    //check if the profile loaded and then grab each available bank profile
    if (this.props.session.profile) {
      const banks = this.props.session.profile.banks;
      for (let bank in banks) {
        if (!this.props.session.profile.banks[bank]) {
          this.props.sessionActions.getBankProfile(bank);
        }
      }
    }

    return (
      <div>
        <Segment compact id="Profile">
          <Header as='h1'>Banking Profile</Header>
          <p>This is where you can set profile information (show customer profile, and set which api's to enable, when
            an api is enabled show the countdown for the auth and refresh tokens)</p>
          <p>Some of the links of the menu will require authentication, please visit the project README at 'Some Link
            Here' to view the table of users and their institutions.</p>
          <Button.Group>
            <Button onClick={LoginBBVA} negative>Login BBVA</Button>
            <Button.Or />
            <Button onClick={LoginCiti} positive>Login Citi</Button>
          </Button.Group>
        </Segment>
        {
          this.props.session.profile &&
          Object.keys(this.props.session.profile.banks).map(key => (
            this.props.session.profile.banks[key] &&
            <Segment key={key} id="Profile">
              <Header as='h1'>{key} Profile</Header>
              <p>Bank specific profile info.</p>
              <br />
              <p>firstname: {this.props.session.profile.banks[key].firstName}</p>
              <p>lastname: {this.props.session.profile.banks[key].lastName}</p>
            </Segment>
            ||
            !this.props.session.profile[key] &&
            <Segment key={key} id="Profile">
              <Header as='h1'>{key} Profile</Header>
              <p>Bank specific profile info.</p>
              <br />
              <p>Throw a status message here.</p>
            </Segment>
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return state.SessionReducer;
};

const mapDispatchToProps = function (dispatch) {
  return {
    sessionActions: bindActionCreators(SessionActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
