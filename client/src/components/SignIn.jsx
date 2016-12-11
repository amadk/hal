import React from 'react';
import { Link, withRouter } from 'react-router';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default props => (

  <div className="signin">
    <h1 className="centerText"> Immerse </h1>

    <div className="centerButtons">
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <TextField
      hintText="Email Field"
      floatingLabelText="Email"
      onChange={event => props.onEmailChange(event)}
    />
    </MuiThemeProvider>
    <br />
    <MuiThemeProvider muiTheme={getMuiTheme()}>
    <TextField
      hintText="Password Field"
      floatingLabelText="Password"
      type="password"
      onChange={event => props.onPasswordChange(event)}
    />
    </MuiThemeProvider>
    <br />
    <br/>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <RaisedButton label="Sign In" primary={true} onClick={props.submitFn} />
    </MuiThemeProvider>

    <br/>
    <br/>

    <div>
        <p className="fancyText"> No account yet? </p>
        <Link to="/signup" className="fancyText"> Sign up here</Link>
    </div>
    </div>

  </div>
);
