import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


let fileName = '';
let filePath = '';
let fileDescrip = '';
let currentFiles = [];

class AppStore extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    }
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
          },
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
    return (
      <div>
        <div>AppStore!!!</div>

        <div className="centerButtons">
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <RaisedButton
            label="Upload"
            labelPosition="before"
            style={styles.button}
            containerElement="label">
              <input id="fileUp" type="file" style={styles.exampleImageInput} />
            </RaisedButton>
          </MuiThemeProvider>
        </div>
        
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Link to="/search"><RaisedButton type="button" label="Web Search"/></Link>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default withRouter(AppStore, { withRef: true });