import React, { useRef, useImperativeHandle, forwardRef } from "react";

import Button from "../UI/Button/Button";

let PlayControls = (props, ref) => {
	let playControls = useRef();
	useImperativeHandle(ref, () => ({
		classList: playControls.current.classList,
	}));
	return (
		<div className="play-controls" ref={playControls}>
			<div className="icon">
				<i
					className="fas fa-step-backward"
					onClick={props.backwardStepClicked}
					disabled={props.disabled}
				></i>
			</div>
			{props.paused ? (
				<Button
					classNames="play-control"
					clicked={props.playClicked}
					disabled={props.disabled}
				>
					Sort
				</Button>
			) : (
				<Button
					classNames="burgundy play-control"
					clicked={props.pauseClicked}
					disabled={props.disabled}
				>
					Pause
				</Button>
			)}
			<div className="icon">
				<i
					className="fas fa-step-forward"
					onClick={props.forwardStepClicked}
					disabled={props.disabled}
				></i>
			</div>
		</div>
	);
};

PlayControls = forwardRef(PlayControls);

export default PlayControls;
