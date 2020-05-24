import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Card from "../../../components/UI/Card/Card";

// TODO: style number
let Controls = (props, ref) => {
	const errorMessage = useRef();
	useImperativeHandle(ref, () => ({
		classList: errorMessage.current.classList,
		children: errorMessage.current.children,
	}));
	return (
		<div className="controls">
			<Card>
				<h2>Controls</h2>
				<div className="input-group">
					<label htmlFor="arrSize">Array Size</label>
					<input
						type="range"
						min="5"
						max="100"
						value={props.size}
						onChange={props.changedArraySize}
						disabled={props.disableControls}
						id="arrSize"
						name="arrSize"
					/>
					<div className="range-labels">
						<p>5</p>
						<p>100</p>
					</div>
					<div className="error-message" ref={errorMessage}>
						<p></p>
					</div>

					<input
						type="number"
						value={props.size}
						onChange={props.changedArraySize}
						disabled={props.disableControls}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="sortSpeed">Sorting Speed</label>
					<input
						type="range"
						min="5"
						max="2000"
						step="5"
						value={props.speed}
						onChange={props.changedSortingSpeed}
						id="sortSpeed"
						name="sortSpeed"
					/>
					<div className="range-labels">
						<p>Extremely Fast</p>
						<p>Extremely Slow</p>
					</div>
				</div>
			</Card>
			{/* <Card>
				<h2>Options</h2>
			</Card> */}
		</div>
	);
};

Controls = forwardRef(Controls);

export default Controls;
