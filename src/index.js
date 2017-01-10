import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { AppStore } from 'mybankingclientlib';
import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import Home from './pages/Home';
import Accounts from './pages/Accounts';
import Profiles from './pages/Profiles';
import AuthRedirect from './pages/AuthRedirect';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Logout from './pages/Logout';

import './index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

ReactDOM.render(
  (<Provider store={AppStore}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="accounts" component={Accounts} />
        <Route path="profiles" component={Profiles} />
        <Route path="bbva" component={AuthRedirect} />
        <Route path="citi" component={AuthRedirect} />
        <Route path="login" component={Login} />
        <Route path="logout" component={Logout} />
        <Route path="*" component={NoMatch} />
      </Route>
    </Router>
  </Provider>),
  document.getElementById('root')
);
