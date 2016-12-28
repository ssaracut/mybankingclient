import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import AuthRedirect from './pages/AuthRedirect';
import NoMatch from './pages/NoMatch';

import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import './index.css';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

ReactDOM.render(
  (<Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="accounts" component={Accounts}/>
      <Route path="bbva" component={AuthRedirect}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>),
  document.getElementById('root')
);
