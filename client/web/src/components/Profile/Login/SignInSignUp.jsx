import React from 'react';
import { Link, withRouter } from 'react-router';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import Login from './Login.jsx';
import SignUp from './SignUp.jsx';


import axios from 'axios';


const styles = {
  title: {
    fontSize: '30px',
    fontWeight: '300',
    fontFamily: 'sans-serif',
    margin: '35px 0 25px 25px'
  }
}

class SignInSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount () {
    
  }


  render() {
    return (
      <div>
        <div style={styles.title}>Sign In</div>
        <Login/>
        <div style={styles.title}>Or Sign Up</div>
        <SignUp/>
      </div>
    )
  }
}

export default withRouter(SignInSignUp, { withRef: true });