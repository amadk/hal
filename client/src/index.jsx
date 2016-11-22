import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

// import SignIn from './components/Signin.jsx';
// import SignUp from './components/Signup.jsx';

import App from './components/App.jsx';
import Search from './components/Search.jsx';
// import Store from './components/Store.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      {
        // <Route path="signup" component={SignUp} />
        // <Route path="signin" component={SignIn} />
        // <Route path="store" component={Store} />
          }
      <Route path="search" component={Search} />
    </Route>
  </Router>
), document.getElementById('app'));