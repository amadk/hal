import React from 'react';

let appExpanded = false;

const expandAppCard = (e) => {
  // if (!appExpanded) {
  //   $(e.target).parent().prev().animate({height: '500px'}, 250);
  //   $(e.target).css({'transform' : 'rotate(180deg)'});
  //   appExpanded = true;
  // } else {
  //   $(e.target).parent().prev().animate({height: '200px'}, 250);
  //   $(e.target).css({'transform' : 'rotate(360deg)'});
  //   appExpanded = false;
  // }
}

export default props => {
  return (
    <div className="appCardControls">
      <img className="likeIcon" src="web/assets/like.png"/>
      <img className="appControlIcon" src="web/assets/share.png"/>
      <img className="appControlIcon" src="web/assets/more.png"/>
      <img className="expandIcon" src="web/assets/expand.png" onClick={(e)=>{expandAppCard(e)}} />
      <img className="fullScreenIcon" src="web/assets/fullScreen.png"/>
    </div>
  )
}