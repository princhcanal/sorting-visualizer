import React, { useRef, useImperativeHandle, forwardRef } from "react";
import Card from "../../../components/UI/Card/Card";

// TODO: style number
let Controls = (props, ref) => {
	const errorMessage = useRef();
	const numBars = useRef();
	useImperativeHandle(ref, () => ({
		classList: errorMessage.current.classList,
		children: errorMessage.current.children,
	}));

	const handleChangeNum = (operation) => {
		if (operation === "-") {
			numBars.current.value = Number(numBars.current.value) - 1;
		} else if (operation === "+") {
			numBars.current.value = Number(numBars.current.value) + 1;
		}
		props.changedArraySize(numBars.current.value);
	};
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

					<div className="change-num">
						<button
							className="decrement"
							onClick={() => handleChangeNum("-")}
						>
							-
						</button>
						<input
							ref={numBars}
							type="number"
							value={props.size}
							onChange={() =>
								props.changedArraySize(numBars.current.value)
							}
							disabled={props.disableControls}
						/>
						<button
							className="increment"
							onClick={() => handleChangeNum("+")}
						>
							+
						</button>
					</div>
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
