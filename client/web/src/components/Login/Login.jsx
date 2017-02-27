import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';

import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import isEmail from 'validator/lib/isEmail';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


const customContentStyle = {
  width: '50%',
  maxWidth: 'none',
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      fullName: '',
      loginBox: false
    }
  }

  onTextBoxChange(event, inputType) {
    var obj = {};
    obj[inputType] = event.target.value
    this.setState(obj);
    console.log(this.state[inputType])
  }

  toggleLoginForm (boolean) {
    this.setState({
      loginBox: boolean
    })
    console.log(this.state.loginBox)
  }

  /** This function when invoked will submit email and password. */
  submitFn() {
    /** Grab email and password values from fields */
    let self = this;
    const email = this.state.email;
    const password = this.state.password;
    const fullName = this.state.fullName;

    /** Submit email and password for verification */
    if (isEmail(email)) {
      $.post({
        url: '/auth/signIn',
        contentType: 'application/json',
        data: JSON.stringify({email: email, password: password, fullName: fullName}),
        success: (data) => {
          console.log('Sucessful authentication', data, data.auth);
          if (data.auth) {
            self.props.router.replace('/search');
          } else if (data === 'User exists!') {
            console.log('User exists!');
          }
        },
        error: (error) => {
          console.error(error);
          $('.error').show();
        },
      });
    } else {
      console.log('Not a valid email')
    }
  }


  render() {
    var self = this
    return (
      <div className="loginPage">
        {/*<div id="loginMessageBox">
                  <div id="loginMessage">Control the web with simple commands</div>
                </div>*/}
        <div id="loginForm">   
          <SignIn
          toggleLoginForm={this.toggleLoginForm.bind(this)}
          loginBox={self.state.loginBox}
          onTextBoxChange={this.onTextBoxChange.bind(this)}
          submitFn={this.submitFn.bind(this)} />

          <SignUp
          toggleLoginForm={this.toggleLoginForm.bind(this)}
          loginBox={this.state.loginBox}
          onTextBoxChange={this.onTextBoxChange.bind(this)}
          submitFn={this.submitFn.bind(this)} />
        </div>
      </div>
    )
  }
}

export default withRouter(Login, { withRef: true });

