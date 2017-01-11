import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Header, Segment } from 'semantic-ui-react'


import { SessionActions } from 'mybankingclientlib'

class ProfilesPage extends React.Component {
<<<<<<< HEAD
  componentWillMount() {
    if (!this.props.session.profile) {
      this.props.sessionActions.getProfile();
    }
  }

  render() {
    function LoginBBVA() {
      let location = encodeURI('https://localhost:3000/bbva');
      window.location.href = `https://connect.bbva.com/token/authorize?client_id=app.bbva.mynewapp&response_type=code&redirect_uri=${location}`;
    }

    function LoginCiti() {
      let location = encodeURI('https://localhost:3000/citi');
      window.location.href = `https://sandbox.apihub.citi.com/gcb/api/authCode/oauth2/authorize?response_type=code&client_id=a12b4efd-d529-416a-ab19-37585d54b0a3&scope=accounts_details_transactions customers_profiles&countryCode=US&businessCode=GCB&locale=en_US&state=12345&redirect_uri=${location}`;
    }
    return (
      <div>
        <Card shadow={0} style={{ width: '512px', margin: 'auto' }}>
          <CardTitle>My Banking Profile</CardTitle>
          <CardText style={{ height: '176px' }}>
            This is where you can set profile information (show customer profile, and set which api's to enable, when an api is enabled show the countdown for the auth and refresh tokens)
                        <br /><br />
            <Button raised colored onClick={LoginBBVA}>Login BBVA</Button>
            <br /><br />
            <Button raised colored onClick={LoginCiti}>Login Citi</Button>
          </CardText>
        </Card>
        {
          this.props.session.profile &&
          Object.keys(this.props.session.profile.banks).map(key => (
            <Card key={key} shadow={0} style={{ width: '512px', margin: 'auto', marginTop: '20px' }}>
              <CardTitle>{key} Profile</CardTitle>
              <CardText style={{ height: '176px' }}>
                <p>Bank specific profile info.</p>
                <br />
                <p>firstname: {this.props.session.profile.banks[key].firstname}</p>
                <p>lastname: {this.props.session.profile.banks[key].lastname}</p>
              </CardText>
            </Card>))
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
  };
=======
	componentWillMount() {
		if (!this.props.session.profile) {
			this.props.sessionActions.getProfile();
		}
	}

	render() {
		function LoginBBVA() {
			let location = encodeURI('https://localhost:3000/bbva');
			window.location.href = `https://connect.bbva.com/token/authorize?client_id=app.bbva.mynewapp&response_type=code&redirect_uri=${location}`;
		}

		function LoginCiti() {
			let location = encodeURI('https://localhost:3000/citi');
			window.location.href = `https://sandbox.apihub.citi.com/gcb/api/authCode/oauth2/authorize?response_type=code&client_id=a12b4efd-d529-416a-ab19-37585d54b0a3&scope=accounts_details_transactions customers_profiles&countryCode=US&businessCode=GCB&locale=en_US&state=12345&redirect_uri=${location}`;
		}

		return (
			<div>
        <Segment compact id="Profile">
          <Header as='h1'>Banking Profile</Header>
          <p>This is where you can set profile information (show customer profile, and set which api's to enable, when an api is enabled show the countdown for the auth and refresh tokens)</p>
          <p>Some of the links of the menu will require authentication, please visit the project README at 'Some Link Here' to view the table of users and their institutions.</p>
          <Button.Group>
            <Button onClick={LoginBBVA} negative>Login BBVA</Button>
            <Button.Or />
            <Button onClick={LoginCiti} positive>Login Citi</Button>
          </Button.Group>
        </Segment>
        {
          this.props.session.profile &&
          Object.keys(this.props.session.profile.banks).map(key => (
            <Segment key={key} compact id="Profile">
              <Header as='h1'>{key} Profile</Header>
              <p>Bank specific profile info.</p>
              <br />
              <p>firstname: {this.props.session.profile.banks[key].firstname}</p>
              <p>lastname: {this.props.session.profile.banks[key].lastname}</p>
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
	};
>>>>>>> Refactor-Design
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesPage);
