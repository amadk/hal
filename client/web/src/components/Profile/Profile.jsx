import React from 'react';
import { Link, withRouter } from 'react-router';

import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import Login from './Login/Login.jsx';
import SignUp from './Login/SignUp.jsx';
import SignInSignUp from './Login/SignInSignUp.jsx';

import StoreSignUp from './Login/StoreSignUp.jsx';
import DeverloperInfo from './Info/DeverloperInfo.jsx';
import About from './Info/About.jsx';


import axios from 'axios';


const styles = {
  title: {
    fontSize: '25px',
    fontWeight: 300,
    fontFamily: 'sans-serif',

    margin: '0px 25px 20px 25px',
    textAlign: 'center'
  }
}

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount () {
  }


  render() {
    var self = this;
    return (
      <div style={{paddingTop: '40px', height: this.state.pageHeight}} id="account">
        <div style={styles.title}>
          Welcome to Hal
        </div>

        <Menu autoWidth={false} listStyle={{display: 'block', height: '10px'}} disableAutoFocus={true}>
          {/*<MenuItem primaryText="Login" onClick={() => {self.props.modalOpen(<Login modalClose={self.props.modalClose}/>)}} />
          <Divider />*/}
          <MenuItem primaryText="Sign In/ Sign Up" onClick={() => {self.props.modalOpen(<SignInSignUp modalClose={self.props.modalClose}/>)}} />
          <Divider />
          <MenuItem primaryText="Developer Information" onClick={() => {self.props.modalOpen(<DeverloperInfo modalClose={self.props.modalClose}/>)}} />
          <Divider />
          <MenuItem primaryText="About Us" onClick={() => {self.props.modalOpen(<About modalClose={self.props.modalClose}/>)}} />
        </Menu>

      </div>
    )
  }
}

export default withRouter(Account, { withRef: true });
