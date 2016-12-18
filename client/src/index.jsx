import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';

import App from './components/App.jsx';
import Search from './components/Search.jsx';
import AppStore from './components/AppStore.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <Route path="signup" component={SignUp} />
      <Route path="signin" component={SignIn} />
      <Route path="appstore" component={AppStore} />
      <Route path="search" component={Search} />
    </Route>
  </Router>
), document.getElementById('app'));