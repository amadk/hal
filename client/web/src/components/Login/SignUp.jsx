import React from 'react';
import { Link, withRouter } from 'react-router';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


export default props => (
  
  
  <div className="signUp">
    <Card style={{backgroundColor: 'rgba(0,0,0,0)', color: 'white', borderLeft: '1px solid white', width: '100%'}}>
      <CardActions>
      <CardTitle 
        title="New to Ava? Sign up here" 
        titleColor="white" 
        style={{padding: '0', margin: '0'}}
        titleStyle={{padding: '0', margin: '0'}} />
      <TextField
        floatingLabelText="Full Name"
        onChange={event => props.onTextBoxChange(event, 'fullName')}
        floatingLabelStyle={{color: 'white'}}
        underlineStyle={{borderColor: 'white'}}
        inputStyle={{color: 'white'}}
        floatingLabelFocusStyle={{color: '#E91E63'}}
        underlineFocusStyle={{borderColor: '#E91E63'}}
        fullWidth={true}
      />
      <br/>
      <TextField
        floatingLabelText="Email"
        onChange={event => props.onTextBoxChange(event, 'email')}
        floatingLabelStyle={{color: 'white'}}
        underlineStyle={{borderColor: 'white'}}
        inputStyle={{color: 'white'}}
        floatingLabelFocusStyle={{color: '#E91E63'}}
        underlineFocusStyle={{borderColor: '#E91E63'}}
        fullWidth={true}
      />
      <br/>
      <TextField
        floatingLabelText="Password"
        type="password"
        onChange={event => props.onTextBoxChange(event, 'password')}
        floatingLabelStyle={{color: 'white'}}
        underlineStyle={{borderColor: 'white'}}
        inputStyle={{color: 'white'}}
        floatingLabelFocusStyle={{color: '#E91E63'}}
        underlineFocusStyle={{borderColor: '#E91E63'}}
        fullWidth={true}
      />
      <br/>
      <br/>
        <FlatButton
          label="Sign Up" 
          backgroundColor="transparent"
          style={{border: "1px solid white"}} 
          labelStyle={{color: "white" }}
          onClick={props.submitFn}
          hoverColor="#F44336" />
      </CardActions>
    </Card>
  </div>
);

