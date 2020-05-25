import React from "react";

const PlayControls = (props) => {
	return (
		<div className="play-controls">
			<i className="fas fa-step-backward"></i>
			{props.pause ? (
				<i className="fas fa-play"></i>
			) : (
				<i className="fas fa-pause"></i>
			)}
			<i className="fas fa-step-forward"></i>
		</div>
	);
};

export default PlayControls;
