import React from 'react';
import { Link, withRouter } from 'react-router';

import axios from 'axios';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import americanStates from './StatesAndCities.jsx';


class StoreSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stateValue: 0,
      cityValue: 0
    }
  }

  componentDidMount () {
    
  }

  stateHandleChange (event, index, value) {
    this.setState({stateValue: value});
  }

  cityHandleChange (event, index, value) {
    this.setState({cityValue: value});
  }

  render() {
    var allStates = americanStates();
    var statesField = allStates.map(function(stateObj, index) {
      var state = Object.keys(stateObj)[0]
      return (<MenuItem value={index} primaryText={state} key={index} />)
    })
    var selectedState = Object.keys(allStates[this.state.stateValue])[0]
    var citiesField = allStates[this.state.stateValue][selectedState].map(function(city, index) {
      return (<MenuItem value={index} primaryText={city} key={index} />)
    })

    return (
      <div>
        <div id="introMessage">
          <div id="introText">
            Build your business through customer accessibility and a networked community
          </div>
        </div>

        <form id="loginForm">
          <TextField
            floatingLabelText="Store Name"
            onChange={event => {props.onTextBoxChange(event, 'email')}}
            floatingLabelStyle={{color: 'rgb(179, 179, 179)'}}
            floatingLabelFocusStyle={{color: 'black'}}
            underlineStyle={{borderColor: 'rgb(179, 179, 179)'}}
            underlineFocusStyle={{borderColor: 'black'}}
            inputStyle={{color: 'black'}}
            fullWidth={true}
          />
          <TextField
            floatingLabelText="Email"
            onChange={event => {props.onTextBoxChange(event, 'email')}}
            floatingLabelStyle={{color: 'rgb(179, 179, 179)'}}
            floatingLabelFocusStyle={{color: 'black'}}
            underlineStyle={{borderColor: 'rgb(179, 179, 179)'}}
            underlineFocusStyle={{borderColor: 'black'}}
            inputStyle={{color: 'black'}}
            fullWidth={true}
          />
          <TextField
            floatingLabelText="Password"
            type="password"
            onChange={event => {props.onTextBoxChange(event, 'password')}}
            floatingLabelStyle={{color: 'rgb(179, 179, 179)'}}
            floatingLabelFocusStyle={{color: 'black'}}
            underlineStyle={{borderColor: 'rgb(179, 179, 179)'}}
            underlineFocusStyle={{borderColor: 'black'}}
            inputStyle={{color: 'black'}}
            fullWidth={true}
          />
          <TextField
            floatingLabelText="Phone"
            onChange={event => {props.onTextBoxChange(event, 'email')}}
            floatingLabelStyle={{color: 'rgb(179, 179, 179)'}}
            floatingLabelFocusStyle={{color: 'black'}}
            underlineStyle={{borderColor: 'rgb(179, 179, 179)'}}
            underlineFocusStyle={{borderColor: 'black'}}
            inputStyle={{color: 'black'}}
            fullWidth={true}
          />
          <TextField
            floatingLabelText="Website URL"
            onChange={event => {props.onTextBoxChange(event, 'email')}}
            floatingLabelStyle={{color: 'rgb(179, 179, 179)'}}
            floatingLabelFocusStyle={{color: 'black'}}
            underlineStyle={{borderColor: 'rgb(179, 179, 179)'}}
            underlineFocusStyle={{borderColor: 'black'}}
            inputStyle={{color: 'black'}}
            fullWidth={true}
          />
          <SelectField
            floatingLabelText="Country" 
            value={1} 
            disabled={true}
            fullWidth={true} >

            <MenuItem value={1} primaryText="United States of America" />
          </SelectField>

          <SelectField
            floatingLabelText="State"
            value={this.state.stateValue}
            onChange={this.stateHandleChange.bind(this)} >
            {statesField}
          </SelectField>
          <br/>
          <SelectField
            floatingLabelText="City"
            value={this.state.cityValue}
            onChange={this.cityHandleChange.bind(this)} >
            {citiesField}
          </SelectField>

          <TextField
            floatingLabelText="ZIP Code"
            onChange={event => {props.onTextBoxChange(event, 'email')}}
            floatingLabelStyle={{color: 'rgb(179, 179, 179)'}}
            floatingLabelFocusStyle={{color: 'black'}}
            underlineStyle={{borderColor: 'rgb(179, 179, 179)'}}
            underlineFocusStyle={{borderColor: 'black'}}
            inputStyle={{color: 'black'}}
            fullWidth={true}
          />
          <TextField
            floatingLabelText="Street Address 1"
            onChange={event => {props.onTextBoxChange(event, 'email')}}
            floatingLabelStyle={{color: 'rgb(179, 179, 179)'}}
            floatingLabelFocusStyle={{color: 'black'}}
            underlineStyle={{borderColor: 'rgb(179, 179, 179)'}}
            underlineFocusStyle={{borderColor: 'black'}}
            inputStyle={{color: 'black'}}
            fullWidth={true}
          />
          <TextField
            floatingLabelText="Street Address 2"
            onChange={event => {props.onTextBoxChange(event, 'email')}}
            floatingLabelStyle={{color: 'rgb(179, 179, 179)'}}
            floatingLabelFocusStyle={{color: 'black'}}
            underlineStyle={{borderColor: 'rgb(179, 179, 179)'}}
            underlineFocusStyle={{borderColor: 'black'}}
            inputStyle={{color: 'black'}}
            fullWidth={true}
          />
          <FlatButton
            label="Sign Up"
            backgroundColor="black"
            hoverColor="black"
            labelStyle={{color: "white"}}
            style={{margin: '10px auto', width: '100%', marginBottom: '20px'}}
          />


        </form>

      </div>
    )
  }
}

export default withRouter(StoreSignUp, { withRef: true });