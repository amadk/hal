import React from 'react';
import { Link, withRouter } from 'react-router';

import Search from './Search.jsx';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';
import isEmail from 'validator/lib/isEmail';

import getMuiTheme from 'material-ui/styles/getMuiTheme';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onFirstChange(event) {
    this.setState({ firstName: event.target.value });
  }

  onLastChange(event) {
    this.setState({ lastName: event.target.value });
  }

  /** This function when invoked will submit email and password. */
  submitFn() {
    /** Grab email and password values from fields */
    let self = this;
    const email = this.state.email;
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;

    /** Submit email and password for verification */
    if (isEmail(email)) {
      $.post({
        url: this.props.router.location.pathname,
        contentType: 'application/json',
        data: JSON.stringify({email: email, password: password, firstName: firstName, lastName: lastName}),
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

  getChildContext() {
    return {muiTheme: getMuiTheme()};
  }

  render() {
    if (this.props.router.location.pathname.indexOf('/signup') >= 0) {
      return (
        <SignUp
        onEmailChange={this.onEmailChange.bind(this)}
        onPasswordChange={this.onPasswordChange.bind(this)}
        onFirstChange={this.onFirstChange.bind(this)}
        onLastChange={this.onLastChange.bind(this)}
        submitFn={this.submitFn.bind(this)}
        />
      );
    } else if (this.props.router.location.pathname.indexOf('/signin') >= 0) {
        return (
          <SignIn
          onEmailChange={this.onEmailChange.bind(this)}
          onPasswordChange={this.onPasswordChange.bind(this)}
          submitFn={this.submitFn.bind(this)}
          />
        );
    } else if (this.props.router.location.pathname.indexOf('/search') >= 0) {
        return <Search />
    }
  }
}


App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

export default withRouter(App, { withRef: true });

