import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';
import axios from 'axios';
import TextField from 'material-ui/TextField';

import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

import AppCard from './AppCard.jsx';


import io from 'socket.io-client';
let socket = io('http://10.0.1.2:8000')

const dataSource1 = [
  {
    text: 'text-value1',
    value: (
      <MenuItem
        primaryText="text-value1"
        secondaryText="&#9786;"
      />
    ),
  },
  {
    text: 'text-value2',
    value: (
      <MenuItem
        primaryText="text-value2"
        secondaryText="&#9786;"
      />
    ),
  },
];

class Command extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      command: '',
      apps: ['http://www.measurementlab.net/p/ndt-ws.html']
    }
  }

  componentDidMount () {
    // socket.on('news', function (data) {
    //   console.log(data);
    //   socket.emit('my other event', { my: 'data' });
    // });
    // socket.emit('command', { command: 'calculate 1+1' });
    // axios.get('/bla').then(function(response) {
    //   console.log(response.obj)
    // })
    var self = this
    
    socket.on('response', function(app) {
      if(app) {
        var appIsThere = false;
        var appIndex;
        for (var i = 0; i < self.state.apps.length; i++) {
          if (self.state.apps[i].split('?')[0] === app.split('?')[0]) {
            appIsThere = true;
            appIndex = i
            break;
          }
        }
        if (appIsThere) {
          self.state.apps.splice(appIndex, 1)
        }
        self.state.apps.unshift(app);
        self.setState({
          apps: self.state.apps,
          command: ''
        });
      }
    })
  }

  setCommandState (event) {
    this.setState({
      command: event.target.value
    });
    console.log(this.state.command)
  }


  getApps (e) {
    e.preventDefault();
    
    socket.emit('command', { command: this.state.command });
  }



  render() {

    let self = this;

    var apps = this.state.apps.map((appData, index) => {
      return <AppCard htmlLink={appData} key={index}/>;
    });

    return (
      <div id="commandPage">

        <form id="commandContainer" onSubmit={(e) => {self.getApps(e)}}>
          {/*<input id="commandBox"
                      onChange={(event) => {self.setCommandState(event)}} />*/}
          <AutoComplete
            id="commandBox"
            floatingLabelText="Enter Commands Here"
            filter={AutoComplete.noFilter}
            dataSource={dataSource1}
            onChange={(event) => {self.setCommandState(event)}}
            fullWidth={true}
            style={{width: '95%'}} />
        </form>

        <div id="appsBody">
          <div id="apps">{apps}</div>
        </div>
      </div>
    )
  }
}

export default withRouter(Command, { withRef: true });