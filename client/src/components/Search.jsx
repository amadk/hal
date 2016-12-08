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
        url: '/search',
        data: {q: this.state.query},
        success: function(data) {
          console.log('Success!', data);
          self.setState({results: data}) 
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
    }
    var results = this.state.results.map((result, index) => {
      return (<Result name={result.name} displayUrl={result.displayUrl} snippet={result.snippet} key={index}/>);
    });
    return (
      <div className="searchBox">
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <TextField floatingLabelText="Search" type="text" onChange={(event) => {self.setState({query: event.target.value}); console.log(this.state.query)}}/>
      </MuiThemeProvider>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <RaisedButton type="submit" buttonStyle={style} label="Search" onClick={this.getSearchResults.bind(this)}/>    
      </MuiThemeProvider> 
        {results}
      </div>
    )
  }
}

export default withRouter(Search, { withRef: true });