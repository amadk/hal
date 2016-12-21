import React from 'react';

export default props => {
  return (
    <div className="appBox">
      <img src={props.iconLink} className="appIcon" />
      <div className="appIconData">
        <div className="appName">{props.name}</div>
      </div>
      {/*<div className="appVersion">{props.version}</div>*/}
      {/*<div className="appDeveloper">{props.developer}</div>*/}
      {/*<div className="appDescription">{props.description}</div>*/}
    </div>
  )
}