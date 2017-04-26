import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './components/App.jsx';
import Home from './components/Command/CommandSpace.jsx';
import AppStore from './components/AppStore/AppStore.jsx';
import Profile from './components/Profile/Profile.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} />
    <Route path="/home" component={App} />
    <Route path="/appStore" component={App} />
    <Route path="/profile" component={App} />
  </Router>
), document.getElementById('app'));