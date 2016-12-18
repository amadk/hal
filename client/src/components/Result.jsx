import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


export default props => {
  var link = props.displayUrl;
  if (props.displayUrl.indexOf('http') < 0) {
    link = 'http://' + link;
  }
  return (
    <div className="resultCard">
      <a target="_blank" className="resultTitle" href={link}>{props.name}</a>
      <div className="resultUrl">{props.displayUrl}</div>
      <div className="resultSnippet">{props.snippet}</div>
    </div>
  )
}