import React from 'react';
import AppCardControls from './AppCardControls.jsx';


export default props => {
  return (
    <div className="appCard">
      <iframe className="miniApp" src={props.htmlLink}></iframe>
      <AppCardControls />
    </div>
  )
}