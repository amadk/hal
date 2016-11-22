import React from 'react';
import { Link, withRouter } from 'react-router';

import Results from './Results.jsx';

class Search extends React.Component {

  render() {
    return (
      <div>
        <form>
          <input type="text"/>
          <input type="submit" value="Search"/>
        </form>

        <Results />
      </div>
    )
  }
}

export default withRouter(Search, { withRef: true });