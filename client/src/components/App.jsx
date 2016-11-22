import React from 'react';
import { Link, withRouter } from 'react-router';

import Search from './Search.jsx';


class App extends React.Component {

  render() {
    return (
      <div>
        <Search />
      </div>
    )
  }
}

export default withRouter(App, { withRef: true });

