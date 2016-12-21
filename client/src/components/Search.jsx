import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';

import Results from './Results.jsx';
import Result from './Result.jsx';
import SearchApp from './SearchApp.jsx';
import 'materialize-css';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      query: '',
      apps: [],
      searchResults: []
    }
  }

  componentDidMount () {
    $.get({
      url: '/apps',
      success: data => {
        console.log('success!', data)
        this.setState({apps: data})
      },
      error: error => {
        console.error('error in get upload', error);
      }
    });
  }


  getSearchResults (e) {
    e.preventDefault()
    let self = this;

    if (this.state.query !== '') {
      $.get({
        url: '/webSearch',
        data: {q: this.state.query},
        success: function(data) {

          console.log('Success!', data);

          self.setState({
            apps: data.apps,
            searchResults: data.results
          });
        },
        error: function(error) {
          console.log(error)
        }
      });
    } else {
      console.log('request not sent')
    }
  }

  render() {

    let self = this;

    var apps = this.state.apps.map((app, index) => {
      return <SearchApp htmlLink={app.htmlLink} key={index}/>;
    });

    var searchResults = this.state.searchResults.map((result, index) => {
      return (<Result name={result.name} displayUrl={result.displayUrl} snippet={result.snippet} key={index}/>);
    });

    return (
      <div id="searchPage">
        <div id="tabBar">
          <Link to="/appstore" id="appStoreLink">
            <button id="appStoreButton">App Store</button>
          </Link>

          <form id="searchContainer" onSubmit={this.getSearchResults.bind(this)}>
            <input 
              id="searchBox"
              onChange={
                (event) => {
                  self.setState({
                    query: event.target.value
                  });
                  console.log(this.state.query)
                }
              } />

          </form>

          <div style={{clear:'both'}}></div>
        </div>
        <div id="resultsBody">

          <div id="apps">{apps}</div>
          <div id="searchResults">
            {searchResults}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Search, { withRef: true });