import React from 'react';
import { Link, withRouter } from 'react-router';
import $ from 'jquery';

import Results from './Results.jsx';
import Result from './Result.jsx';
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
      results: []
    }
  }

  getSearchResults () {
    let self = this;
    if (this.state.query !== '') {
      $.get({
        url: '/webSearch',
        data: {q: this.state.query},
        success: function(data) {
          console.log('Success!', data);
          self.setState({results: data.results});
          data.apps.forEach(function(app) {
            $('#apps').html(app)
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
    console.log(this.state.results);
    var style = {
      fontFamily: 'sans-serif'
    };
    var results = this.state.results.map((result, index) => {
      return (<Result name={result.name} displayUrl={result.displayUrl} snippet={result.snippet} key={index}/>);
    });
    return (
      <div id="searchPage">
        <div id="tabBar">
          <Link to="/appstore" id="appStoreLink">
            <button id="appStoreButton">App Store</button>
          </Link>

          <div id="searchContainer">
            <input id="searchBox" onChange={(event) => {self.setState({query: event.target.value}); console.log(this.state.query)}}/>
            <button id="searchButton" onClick={this.getSearchResults.bind(this)}>Search</button>    
          </div>
        </div>

        <div id="apps"></div>
        <div id="results">
          {results}
        </div>
      </div>
    )
  }
}

export default withRouter(Search, { withRef: true });