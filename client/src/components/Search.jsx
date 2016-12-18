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
      searchResults: [],
      resultsHtml: ''
    }
    var self = this;

    this.changeResultsHtml = function(val) {
      self.setState({resultsHtml: val});
      console.log('changed results html!', val);
    }

    changeResultsHtml = this.changeResultsHtml;
    console.log(changeResultsHtml);
  }


  getSearchResults () {

    this.changeResultsHtml('');
    let self = this;

    if (this.state.query !== '') {
      $.get({
        url: '/webSearch',
        data: {q: this.state.query},
        success: function(data) {

          console.log('Success!', data);

          results = data.results;

          $('#apps').html('')

          data.apps.forEach(function(app) {
            $('#apps').append(app);
          });

          self.setState({searchResults: data.results});
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
    var searchResults;

    if (this.state.resultsHtml === '') {
      searchResults = this.state.searchResults.map((result, index) => {
        return (<Result name={result.name} displayUrl={result.displayUrl} snippet={result.snippet} key={index}/>);
      });
    } else {
      $('#searchResults').html(this.state.resultsHtml);
    }

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

          <div style={{clear:'both'}}></div> 
        </div>
        <div id="resultsBody">
          <div id="apps"></div>
          <div id="searchResults">
            {searchResults}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Search, { withRef: true });