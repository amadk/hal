import React from 'react';
import { Link, withRouter } from 'react-router';

import axios from 'axios';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


class SignUp extends React.Component {
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
        <form id="loginForm">
          <TextField
            floatingLabelText="Full Name"
            onChange={event => {props.onTextBoxChange(event, 'fullName')}}
            floatingLabelStyle={{color: 'rgb(179, 179, 179)'}}
            floatingLabelFocusStyle={{color: '#2196F3'}}
            underlineStyle={{borderColor: 'rgb(179, 179, 179)'}}
            underlineFocusStyle={{borderColor: '#2196F3'}}
            inputStyle={{color: 'black'}}
            style={{width: '90%', margin: '5px 5%'}}
          />
          <TextField
            floatingLabelText="Email"
            onChange={event => {props.onTextBoxChange(event, 'email')}}
            floatingLabelStyle={{color: 'rgb(179, 179, 179)'}}
            floatingLabelFocusStyle={{color: '#2196F3'}}
            underlineStyle={{borderColor: 'rgb(179, 179, 179)'}}
            underlineFocusStyle={{borderColor: '#2196F3'}}
            inputStyle={{color: 'black'}}
            style={{width: '90%', margin: '5px 5%'}}
          />
          <TextField
            floatingLabelText="Password"
            type="password"
            onChange={event => {props.onTextBoxChange(event, 'password')}}
            floatingLabelStyle={{color: 'rgb(179, 179, 179)'}}
            floatingLabelFocusStyle={{color: '#2196F3'}}
            underlineStyle={{borderColor: 'rgb(179, 179, 179)'}}
            underlineFocusStyle={{borderColor: '#2196F3'}}
            inputStyle={{color: 'black'}}
            style={{width: '90%', margin: '5px 5%'}}
          />
          <FlatButton
            label="Sign Up"
            backgroundColor="#2196F3"
            hoverColor="#2196F3"
            labelStyle={{color: "white"}}
            style={{margin: '10px 5%', width: '90%'}}
          />
        </form>

      </div>
    )
  }
}

export default withRouter(SignUp, { withRef: true });
