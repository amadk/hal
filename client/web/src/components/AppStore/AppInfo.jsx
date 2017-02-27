import React from 'react';
import { Link, withRouter } from 'react-router';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class AppInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }
  
  render() {
    return (
      <div>
        <div className="appBox" onTouchTap={this.handleOpen.bind(this)}>
          <img src={this.props.iconLink} className="appIcon" />
          <div className="appIconData">
            <div className="appName">{this.props.name}</div>
          </div>

          {/*<div className="appVersion">{props.version}</div>*/}
          {/*<div className="appDeveloper">{props.developer}</div>*/}
          {/*<div className="appDescription">{props.description}</div>*/}
        </div>
        <Dialog
          title={this.props.name}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
        >
         The actions in this window were passed in as an array of React objects.
        </Dialog>
      </div>
    )
  } 
}

export default withRouter(AppInfo, { withRef: true });
