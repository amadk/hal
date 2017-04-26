import React from 'react';
import { Link, withRouter } from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import AppInfo from './AppInfo.jsx'

const apps = [
  {
    name: 'Twitter feed',
    developer: 'Moonshot Labs Inc.',
    description: 'Get the tweet your looking!',
    iconLink: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Twitter_bird_logo_2012.svg/1259px-Twitter_bird_logo_2012.svg.png'
  },
  {
    name: 'Sound Cloud Player',
    developer: 'Moonshot Labs Inc.',
    description: 'Play the song you were looking for instantly!',
    iconLink: 'https://cdn2.iconfinder.com/data/icons/minimalism/512/soundcloud.png'
  },
  {
    name: 'YouTube Player',
    developer: 'Moonshot Labs Inc.',
    description: 'Play the video you were looking for instantly!',
    iconLink: 'https://www.aikido-almere.nl/img/youtube-256.png'
  },
  {
    name: 'Wikipedia Data',
    developer: 'Moonshot Labs Inc.',
    description: 'Get the information your looking for instantly!',
    iconLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Wikipedia_Logo_1.0.png/220px-Wikipedia_Logo_1.0.png',
  },
  {
    name: 'Latest Apple Products',
    developer: 'Moonshot Labs Inc.',
    description: 'See the latest apple products or get the price of the apple product your looking for',
    iconLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png'
  },
  {
    name: 'Facebook feed',
    developer: 'Moonshot Labs Inc.',
    description: 'Get the facebook post your looking for!',
    iconLink: 'https://facebookbrand.com/wp-content/themes/fb-branding/prj-fb-branding/assets/images/fb-art.png'
  }
]

const styles = {
  textField: {
    width: '90%',
    margin: '10px 5%'
  },
  appList: {
    // margin: '10px 0px',
    // // border: '1px solid black',
    // width: '100%',
    // height: '100%'
  },
  app: {
    margin: '10px 25px',
    float: 'left',
    width: '100px',
    height: '100px',
  },
  appIcon: {
    height: '70px',
    width: '70px',
    margin: '0 auto',
    display: 'block'
  },
  appName: {
    fontSize: '13px',
    fontFamily: 'sans-serif',
    fontWeight: 300,
    margin: '5px auto',
    width: '100px',
    textAlign: 'center',

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
}

class AppStore extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      textInput: '',
      apps: apps
    }
  }

  componentDidMount () {
    // $.get({
    //   url: '/apps',
    //   success: data => {
    //     console.log('success!', data);
    //     this.setState({apps: data});
    //   },
    //   error: error => {
    //     console.error('error in get upload', error);
    //   }
    // });
  }

  handleChange (e) {
    this.setState({
      textInput: e.target.value
    })
  }

  render() {

    return (
      <div>
        <form id="commandContainer">
          <TextField onChange={this.handleChange.bind(this)} hintText="Search the store" style={styles.textField} underlineFocusStyle={{borderColor: '#2196F3'}} />
        </form>

        <div style={styles.appList}>
          {this.state.apps.map((app, index) => (
            <div style={styles.app} key={index} onClick={()=>{this.props.modalOpen(<AppInfo iconLink={app.iconLink} name={app.name} developer={app.developer} description={app.description} />)}}>
              <img src={app.iconLink} style={styles.appIcon} />
              <div style={styles.appName}>{app.name}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default withRouter(AppStore, { withRef: true });