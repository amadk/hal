import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import AppInfo from './AppInfo.jsx'


let fileName = '';
let filePath = '';
let fileDescrip = '';
let currentFiles = [];

class AppStore extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      apps: []
    }
  }

  componentDidMount () {
    $.get({
      url: '/apps',
      success: data => {
        console.log('success!', data);
        this.setState({apps: data});
      },
      error: error => {
        console.error('error in get upload', error);
      }
    });
  }

  uploadFile () {
  $(function () {
    const fileIsLoaded = e => {
      filePath = e.target.result;
      console.log(filePath);
      if (!currentFiles.includes(fileName)) {
        currentFiles.push(fileName);
        $.post({
          url: '/upload',
          data: JSON.stringify({
            fileName: fileName,
            filePath: filePath,
            description: fileDescrip
          }),
          contentType: 'application/json',
          success: data => {
            console.log('Found user\'s uploaded photo from DB', data);
          },
          error: error => {
            console.error('error in get upload', error);
            $('.error').show();
          }
        });
      }
    };

    $('#fileUp').change(function () {
      console.log('file ATTEMPT');
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        fileDescrip = $('#description').val();
        fileName = this.files[0].name;
        console.log(fileName);
        reader.onload = fileIsLoaded;
        reader.readAsDataURL(this.files[0]);
      }
    });
  });
};

  render() {
    this.uploadFile()
    const styles = {
      button: {
        margin: 12,
        fontFamily: 'Orbitron !important',
        backgroundColor: '#e8e8e8',
        color: 'black !important'
      },
      exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      }
    };
    var apps = this.state.apps.map(function(app) {
      return (<AppInfo 
        iconLink={app.iconLink}
        name={app.name} 
        version={app.version}
        description={app.description} />)
    });
    return (
      <div>
        <div id="appStoreTab">
          <div id="appStoreTitle">App Store</div>
          <label id="uploadButton"><input type="file" id="fileUp" />Upload</label>
          <Link to="/search" id="webSearchLink">
            <button id="webSearchLinkButton">Search</button>
          </Link>
        </div>

        <div id="appStoreApps">
        {apps}
        </div>
      </div>
    )
  }
}

export default withRouter(AppStore, { withRef: true });