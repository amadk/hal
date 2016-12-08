import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


export default props => {
  var link = props.displayUrl;
  if (props.displayUrl.indexOf('http') < 0) {
    link = 'http://' + link;
  }
  return (
    <Card>
      <a href={link}><CardTitle title={props.name} subtitle={props.displayUrl}/></a>
      <CardText>{props.snippet}</CardText>
    </Card>
  )
}