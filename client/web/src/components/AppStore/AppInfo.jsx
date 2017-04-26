import React from 'react';
import { Link, withRouter } from 'react-router';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  appData: {
    height: '120px',
    width: '100%',
  },
  appIcon: {
    height: '100px',
    width: '100px',
    display: 'inline-block',
    border: '0.5px solid #E0E0E0',
    borderRadius: '20px',
    padding: '20px'
  },
  appTextData: {
    display: 'inline-block',
    position: 'absolute',
    height: '100px',
    width: 'calc(100% - 130px)'
  },
  appName: {
    fontWeight: 400,
    fontSize: '16px',
    margin: '10px 0 0 10px'
  },
  appDeveloper: {
    fontSize: '13px',
    marginLeft: '10px'

  },
  installButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,

    borderRadius: '5px',
    padding: '5px 10px',
    fontSize: '13px',
    color: '#2196F3',
    border: '1px solid #2196F3',
    cursor: 'pointer'
  },
  appDescriptionTitle: {
    fontSize: '16px',
    fontWeight: 400
  },
  appDescription: {
    fontSize: '14px',
    lineHeight: '16px',
    marginTop: '5px'
  }
}

class AppInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {
    return (
      <div style={{height: '100%', padding: '15px', fontFamily: 'sans-serif', fontWeight: 300}}>
        <div style={styles.appData}>
          <img style={styles.appIcon} src={this.props.iconLink} />
          <div style={styles.appTextData}>
            <div style={styles.appName}>{this.props.name}</div>
            <div style={styles.appDeveloper}>{this.props.developer}</div>
            <div style={styles.installButton}>Install</div>
          </div>
        </div>
        <div style={styles.appDescriptionTitle}>Description</div>
        <div style={styles.appDescription}>{this.props.description}</div>
      </div>
    )
  } 
}

export default withRouter(AppInfo, { withRef: true });
