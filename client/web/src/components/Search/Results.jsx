import React from 'react';
import { Link, withRouter } from 'react-router';

class Results extends React.Component {

  render() {
    return (
      <div>
        Search Results!!!
      </div>
    )
  }
}

export default withRouter(Results, { withRef: true });