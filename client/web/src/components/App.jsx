import React from 'react';
import { Link, withRouter } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import axios from 'axios';

import Modal from 'react-modal';

import {Tabs, Tab} from 'material-ui/Tabs';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import ShareIcon from 'material-ui/svg-icons/social/share';


import Search from './Search/Search.jsx';
import AppStore from './AppStore/AppStore.jsx';
import Profile from './Profile/Profile.jsx';

import SearchIcon from 'material-ui/svg-icons/action/search';
import AppStoreIcon from 'material-ui/svg-icons/navigation/apps';
import ProfileIcon from 'material-ui/svg-icons/social/person';


const styles = {
  tabItemContainerStyle: {
    // position: 'fixed', 
    // bottom: 0, 
    zIndex: 2,
    // height:'48px',
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px -1px 6px, rgba(0, 0, 0, 0.117647) 0px -1px 4px',
    backgroundColor: '#2196F3',
  },
  overlay: {
    zIndex: '3',
    // backgroundColor:'rgba(0,0,0,0.5)',
  },
  modalContentContainer: {
    width: mobilecheck ? '100%' : '50%',
    zIndex: '3',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    margin: '0 auto',
    padding: '0',
    border: 'none',
    top: 0,
    bottom: 0,
    left: 0,
    bottom: 0,
  },
  modalContent: {
    height: '100vh',
    WebkitOverflowScrolling: 'touch',
    overflow: 'scroll',
    paddingTop: '48px'
    // border: '5px solid red'
  }
};


injectTapEventPlugin();

const views = [
  {
    icon: SearchIcon,
    component: Search
  },
  {
    icon: AppStoreIcon,
    component: AppStore
  },
  {
    icon: ProfileIcon,
    component: Profile
  }
]

class App extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props.router.location.pathname)
    this.routes = {
      '/': 0,
      '/home': 0,
      '/appStore': 1,
      '/profile': 2
    };
    this.routeNames = ['/home', 'appStore', 'profile']

    this.state = {
      modalOpen: false,
      modalClass: "animated slideOutDown",
      modalContent: null,
      selectedIndex: this.routes[this.props.router.location.pathname],
      bodyClassName: ''
    }
  }

  componentDidMount () {
    // axios.get('/checkAuth').then(function(response) {
    //   self.setState({authenticated: response.data});
    // });
  }

  handleChange (value) {
    this.setState({
      slideIndex: value
    });
  };

  select (index) {
    this.setState({
      selectedIndex: index
    });
    this.props.router.replace(this.routeNames[index])
  }

  modalOpen (node) {
    var self = this;
    if (!this.state.modalOpen) { 
      styles.overlay.backgroundColor = 'rgba(0,0,0,0.5)';
      this.setState({
        scrollTop: document.body.scrollTop,
        modalClass: "animated slideInUp",
        modalOpen: true,
        modalContent: node,
      });
      setTimeout(function() {
        self.setState({
          bodyClassName: 'bodyLock'
        })
      }, 600);
    }
  };

  modalClose () {
    var self = this;

    if (this.state.modalOpen) {
      styles.overlay.backgroundColor = 'rgba(0,0,0,0)';
      this.setState({
        modalClass: "animated slideOutDown",
        bodyClassName: ''
      }, function () {        
        document.body.scrollTop = self.state.scrollTop;
      });

      setTimeout(function() {
        self.setState({
          modalOpen: false
        })
      }, 600)
    }
  };


  render() {
    var self = this;
    document.body.className = this.state.bodyClassName;

    return (
      <MuiThemeProvider>
        <div>
          <Tabs
            id="tab"
            initialSelectedIndex={this.state.selectedIndex}
            tabItemContainerStyle={styles.tabItemContainerStyle}
            inkBarStyle={{display: 'none'}}
            value={this.state.selectedIndex}
            onChange={this.select.bind(this)} >

            {views.map((view, index) => (
              <Tab icon={<view.icon />} value={index} key={index} >
                <view.component isModalOpen={this.state.modalOpen} modalOpen={this.modalOpen.bind(this)} modalClose={this.modalClose.bind(this)} />
              </Tab>
            ))}
          </Tabs>

          <Modal
            className={this.state.modalClass}
            id="modal"
            isOpen={this.state.modalOpen}
            onRequestClose={this.modalClose.bind(this)}
            style={{overlay: styles.overlay, content: styles.modalContentContainer}}
            contentLabel="Modal" >
            <div style={styles.modalContent}>
              <div style={{position: 'absolute', top: '0', height: '48px', width: '100%', backgroundColor: '#2196F3'}}>
                <IconButton onTouchTap={this.modalClose.bind(this)} iconStyle={{height: '30px', width: '30px', color: 'white'}} style={{position: 'absolute', left: '5px', top: 0}}>
                  <CloseIcon />
                </IconButton>

                <IconButton onTouchTap={this.modalClose.bind(this)} iconStyle={{height: '30px', width: '30px', color: 'white'}} style={{position: 'absolute', right: '5px', top: 0}}>
                  <ShareIcon />
                </IconButton>
              </div>
            
              {this.state.modalContent}
            </div>

          </Modal>
          
        </div>
      </MuiThemeProvider>
    )
  }
}


export default withRouter(App, { withRef: true });

