import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Dimmer, Sidebar } from 'semantic-ui-react'
import { Link } from 'react-router'

import SessionActions from './core/redux/session/SessionActions'
import MainHeader from './components/MainHeader'
import MainNav from './components/MainNav'
import './App.css';

class App extends Component {
  componentWillMount() {
    this.state = {sidebarVisible: false}
    this.mainSidebarVisibility = this.mainSidebarVisibility.bind(this);
    this.props.sessionActions.getStoredAuthData()
  }

  mainSidebarVisibility() {
    this.setState({sidebarVisible: !this.state.sidebarVisible})
  }

  render() {
    return (
      <div className="reactRoot">
        <MainHeader toggleVisibility={this.mainSidebarVisibility}/>
        <Sidebar.Pushable as={Container}>
          <MainNav sidebarVisible={this.state.sidebarVisible}/>
          <Sidebar.Pusher>
            <Dimmer.Dimmable dimmed={this.state.sidebarVisible} blurring>
              <Dimmer active={this.state.sidebarVisible} onClickOutside={this.mainSidebarVisibility} />
              <Container>
                { this.props.children }
              </Container>
            </Dimmer.Dimmable>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>






  //     <div>
  //     <MainHeader toggleVisibility={this.mainSidebarVisibility}/>
  // <Sidebar.Pushable>
  //   <Sidebar as={Menu} animation='overlay' width='thin' visible={this.state.sidebarVisible} icon='labeled' vertical
  //   inverted>
  //   <Menu.Item name='home'>
  //     <Icon name='home'/>
  //     {this.props.session.options.map(option => (
  //       <Link key={ option.page } to={ option.page }>{ option.label }</Link>
  //     )) }
  // </Menu.Item>
  //   <Menu.Item name='gamepad'>
  //     <Icon name='gamepad'/>
  //     Games
  //     </Menu.Item>
  //     <Menu.Item name='camera'>
  //     <Icon name='camera'/>
  //     Channels
  //     </Menu.Item>
  //     </Sidebar>
  //     <Sidebar.Pusher>
  //     <Image src='http://semantic-ui.com/images/wireframe/paragraph.png'/>
  //     </Sidebar.Pusher>
  //     </Sidebar.Pushable>
  //     </div>
    );


    // <Layout style={{ background: 'url(https://www.getmdl.io/assets/demos/transparent.jpg) center / cover' }}>
    //   <Header transparent title="My Banking Client" style={{ color: 'white' }}>
    //     <Navigation>
    //       {this.props.session.options.map(option => (
    //         <Link key={ option.page } to={ option.page }>{ option.label }</Link>
    //       )) }
    //     </Navigation>
    //   </Header>
    //   <Drawer title="My Banking Client">
    //     <Navigation>
    //       {this.props.session.nav.items.map(item => (
    //         <Link key={ item.page } to={ item.page }>{ item.label }</Link>
    //       )) }
    //     </Navigation>
    //   </Drawer>
    //   <Content>
    //     { this.props.children }
    //   </Content>
    // </Layout>);
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