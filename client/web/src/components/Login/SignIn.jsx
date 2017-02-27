import React from 'react';
import { Link, withRouter } from 'react-router';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


export default props => (


  <div className="signIn">
    <Card style={{backgroundColor: 'rgba(0,0,0,0)', color: 'white', borderLeft: '1px solid white', width:'100%'}}>
      <CardActions>
      <CardTitle 
        title="Login" 
        titleColor="white" 
        style={{padding: '0', margin: '0'}}
        titleStyle={{padding: '0', margin: '0'}} />
      <TextField
        floatingLabelText="Email"
        onChange={event => {props.onTextBoxChange(event, 'email')}}
        floatingLabelStyle={{color: 'white'}}
        floatingLabelFocusStyle={{color: '#F44336'}}
        underlineStyle={{borderColor: 'white'}}
        underlineFocusStyle={{borderColor: '#F44336'}}
        inputStyle={{color: 'white'}}
        fullWidth={true}
      />
      <br/>
      <TextField
        floatingLabelText="Password"
        type="password"
        onChange={event => {props.onTextBoxChange(event, 'password')}}
        floatingLabelStyle={{color: 'white'}}
        floatingLabelFocusStyle={{color: '#F44336'}}
        underlineStyle={{borderColor: 'white'}}
        underlineFocusStyle={{borderColor: '#F44336'}}
        inputStyle={{color: 'white'}}
        fullWidth={true}
      />
      <br/>
      <br/>
        <FlatButton
          label="Login" 
          backgroundColor="transparent"
          style={{border: "1px solid white"}} 
          labelStyle={{color: "white" }}
          onClick={props.submitFn}
          hoverColor="#F44336" />
      </CardActions>
    </Card>
  </div>
);
