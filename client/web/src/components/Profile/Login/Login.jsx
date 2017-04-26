import React from 'react';
import { Link, withRouter } from 'react-router';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import axios from 'axios';


class Login extends React.Component {
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
            label="Login"
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

export default withRouter(Login, { withRef: true });