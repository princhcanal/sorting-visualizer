import React, { useRef, useImperativeHandle, forwardRef } from "react";

import Button from "../UI/Button/Button";

let PlayControls = (props, ref) => {
	let playControls = useRef();
	useImperativeHandle(ref, () => ({
		classList: playControls.current.classList,
	}));
	return (
		<div className="play-controls" ref={playControls}>
			<i
				className="fas fa-step-backward"
				onClick={props.backwardStepClicked}
			></i>
			{props.paused ? (
				<Button classNames="play-control" clicked={props.playClicked}>
					Sort
				</Button>
			) : (
				<Button
					classNames="burgundy play-control"
					clicked={props.pauseClicked}
				>
					Pause
				</Button>
			)}
			<i
				className="fas fa-step-forward"
				onClick={props.forwardStepClicked}
			></i>
		</div>
	);
};

PlayControls = forwardRef(PlayControls);

export default PlayControls;
