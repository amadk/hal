import React from 'react';
import { Link, withRouter } from 'react-router';

import Result from './Result.jsx';

import axios from 'axios';

import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  textField: {
    // width: '90%',
    margin: '10px 0'
  },
  results: {
    width: '90%',
    margin: '10px 0'
  }
}

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      query: '',
      autoSuggest: [],
      searchResults: []
    }
  }

  componentDidMount () {

  }


  getSearchResults (e) {
    if (e) {
      // e.preventDefault()      
    }
    let self = this;

    if (this.state.query !== '') {
      axios.get('/search?q='+this.state.query)
      .then(function (response) {
        self.setState({
          searchResults: response.data.webPages.value
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  getAutoSuggestData (query) {
    let self = this;

    if (this.state.query !== '') {
      axios('/autoSuggest?q='+query)
      .then(function (response) {
        var autoSuggestData = response.data.suggestionGroups[0].searchSuggestions.map(function(suggestion, index) {
          return suggestion.displayText;
        })
        self.setState({
          autoSuggest: autoSuggestData
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  handleChange (value) {
    var self = this;
    if (value.indexOf(' ') > 0) {
      this.setState({
        query: value
      }, () => {
        self.getAutoSuggestData(value)        
      })  
    }
  }

  render() {

    let self = this;

    var searchResults = this.state.searchResults.map((result, index) => {
      return (<Result name={result.name} displayUrl={result.displayUrl} snippet={result.snippet} key={index}/>);
    });

    return (
      <div style={{padding: '0 5%', wordWrap: 'break-word'}}>
          <AutoComplete dataSource={this.state.autoSuggest} onUpdateInput={this.handleChange.bind(this)} onNewRequest={this.getSearchResults.bind(this)} hintText="Search the web" style={styles.textField} underlineFocusStyle={{borderColor: '#2196F3'}} fullWidth={true} />
        <div style={styles.results}>
          {searchResults}
        </div>
      </div>
    )
  }
}

export default withRouter(Search, { withRef: true });