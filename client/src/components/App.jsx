import React from 'react';
import { Link, withRouter } from 'react-router';

import Search from './Search.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


class App extends React.Component {


  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }

  render() {
    return (
      <div>
        <Search />
      </div>
    )
  }
}


App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default withRouter(App, { withRef: true });

