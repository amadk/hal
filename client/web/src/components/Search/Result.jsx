import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const styles = {
  resultCard: {
    // border: '1px solid black',
    // borderRadius: '5px',
    width: '100%',
    margin: '10px 0',
    padding: '5px',

    fontFamily: 'sans-serif',
    fontWeight: 'normal',
    textDecoration: 'none'
  },
  resultTitle: {
    fontSize: '18px',
    fontWeight: 'normal',
    textDecoration: 'none'

  },
  resultUrl: {
    fontSize: '14px',
    color: 'green',
    marginTop: '2.5px',
  },
  resultSnippet: {
    fontSize: '14px',
    lineHeight: 1.4,
    wordWrap: 'break-word',
    color: '#545454'
  }
}

export default props => {
  var link = props.displayUrl;
  if (props.displayUrl.indexOf('http') < 0) {
    link = 'http://' + link;
  }
  return (
    <div style={styles.resultCard}>
      <a target="_blank" style={styles.resultTitle} href={link}>{props.name}</a>
      <div style={styles.resultUrl}>{props.displayUrl}</div>
      <div style={styles.resultSnippet}>{props.snippet}</div>
    </div>
  )
}