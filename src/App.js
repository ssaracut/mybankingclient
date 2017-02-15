import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Dimmer, Sidebar } from 'semantic-ui-react'

import { SessionActions } from 'mybankingclientlib'
import MainHeader from './components/MainHeader'
import MainNav from './components/MainNav'
import './App.css';

export class App extends Component {
  componentWillMount() {
    this.state = { sidebarVisible: false }
    this.mainSidebarVisibility = this.mainSidebarVisibility.bind(this);
    //this.props.sessionActions.getStoredAuthData()
  }

  mainSidebarVisibility() {
    this.setState({ sidebarVisible: !this.state.sidebarVisible })
  }

  render() {
    return (
      <div className="appRoot">
        <MainHeader toggleVisibility={this.mainSidebarVisibility} />
        <Sidebar.Pushable as={Container} className="appContainer">
          <MainNav sidebarVisible={this.state.sidebarVisible} toggleVisibility={this.mainSidebarVisibility} />
          <Sidebar.Pusher>
            <Dimmer.Dimmable dimmed={this.state.sidebarVisible} blurring>
              <Dimmer active={this.state.sidebarVisible} onClickOutside={this.mainSidebarVisibility} />
              <Container>
                {this.props.children}
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <small> You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
                  <br />
                  <small> You are running this application with the following context root: <b>{process.env.REACT_APP_PUBLIC_URL}</b></small>                  
                </div>
              </Container>
            </Dimmer.Dimmable>
          </Sidebar.Pusher>
        </Sidebar.Pushable >
      </div >
    )
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
