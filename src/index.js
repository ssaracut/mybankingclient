import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import AppStore from './core/redux/AppStore';
import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import Home from './pages/Home';
import Accounts from './pages/Accounts';
import AuthRedirect from './pages/AuthRedirect';
import NoMatch from './pages/NoMatch';

import './index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

ReactDOM.render(
  (<Provider store={AppStore}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="accounts" component={Accounts}/>
        <Route path="bbva" component={AuthRedirect}/>
        <Route path="citi" component={AuthRedirect}/>
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </Provider>),
  document.getElementById('root')
);
