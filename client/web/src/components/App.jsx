import React from 'react';
import { Link, withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import axios from 'axios';

import CommandSpace from './Command/CommandSpace.jsx';
import AppStore from './AppStore/AppStore.jsx';
import Login from './Login/Login.jsx';

import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
  slide: {
    // height: '100%'
  }
};


injectTapEventPlugin();


class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.router.location.pathname)
    this.routes = {
      '/': 0,
      '/home': 0,
      '/appStore': 1,
      '/login': 2
    };
    this.routeNames = ['/home', 'appStore', 'login']
    this.state = {
      authenticated: false,
      slideIndex: this.routes[this.props.router.location.pathname]
    }
  }

  componentDidMount () {
    // axios.get('/checkAuth').then(function(response) {
    //   self.setState({authenticated: response.data});
    // });
  }

  handleChange (value) {
    this.props.router.replace(this.routeNames[value]);
    this.setState({
      slideIndex: value// this.routes[this.props.router.location.pathname]
    });
  };


  render() {
    return (
      <MuiThemeProvider>
        <div style={{height: '100%'}}>
          <Tabs
            className="tabs"
            onChange={this.handleChange.bind(this)}
            value={this.state.slideIndex} 
            tabItemContainerStyle={{backgroundColor: 'black', display: 'block'}}
            style={{zIndex: '10'}} >

            <Tab label="Command" value={0} />
            <Tab label="App Store" value={1} />
            <Tab label="Login" value={2} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange.bind(this)}
            style={styles.slide}
            animateHeight={true} >

            <div id="tabVal">
              <CommandSpace/>
            </div>
            <div style={styles.slide}>
              <AppStore/>
            </div>
            <div style={styles.slide}>
              <Login />
            </div>
          </SwipeableViews>
          
        </div>
      </MuiThemeProvider>
    )
  }
}


export default withRouter(App, { withRef: true });

