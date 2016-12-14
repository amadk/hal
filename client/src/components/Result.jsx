import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


export default props => {
  var link = props.displayUrl;
  if (props.displayUrl.indexOf('http') < 0) {
    link = 'http://' + link;
  }
  return (
    <div className="resultCard">
      <div className="resultTitle"><a href={link}>{props.name}</a></div>
      <div className="resultUrl">{props.displayUrl}</div>
      <div className="resultSnippet">{props.snippet}</div>
    </div>
  )
}