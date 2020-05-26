import React from "react";

import Button from "../UI/Button/Button";

const PlayControls = (props) => {
	return (
		<div className="play-controls">
			<i className="fas fa-step-backward" onClick={props.stepClicked}></i>
			{props.paused ? (
				<Button className="" clicked={props.playClicked}>
					Sort
				</Button>
			) : (
				<Button classNames="burgundy" clicked={props.pauseClicked}>
					Pause
				</Button>
			)}
			<i className="fas fa-step-forward" onClick={props.stepClicked}></i>
		</div>
	);
};

export default PlayControls;
