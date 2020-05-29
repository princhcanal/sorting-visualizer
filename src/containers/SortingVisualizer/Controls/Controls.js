import React, { useRef, useImperativeHandle, forwardRef } from "react";

import Card from "../../../components/UI/Card/Card";
import Range from "../../../components/UI/Range/Range";
import Counter from "../../../components/UI/Counter/Counter";

let Controls = (props, ref) => {
	const errorMessage = useRef();
	const numBars = useRef();
	const controls = useRef();

	useImperativeHandle(ref, () => ({
		classList: errorMessage.current.classList,
		children: errorMessage.current.children,
	}));

	const handleChangeNum = (operation) => {
		controls.current.classList.remove("shake");
		let currentVal = Number(numBars.current.value);

		if (operation === "-" && currentVal > 5) {
			numBars.current.value = currentVal - 1;
			props.changedArraySize(null, numBars.current.value);
		} else if (operation === "+" && currentVal < 100) {
			numBars.current.value = currentVal + 1;
			props.changedArraySize(null, numBars.current.value);
		} else {
			// shake animation
			setTimeout(() => {
				controls.current.classList.add("shake");
			}, 10);
		}
	};
	return (
		<div className="controls" ref={controls}>
			<Card>
				<h2>Controls</h2>
				<Range
					min="5"
					max="100"
					step="1"
					value={props.size}
					onChange={props.changedArraySize}
					disabled={props.disableControls}
					id="arrSize"
					name="arrSize"
					htmlFor="arrSize"
					label="Array Size"
					leftText="5"
					rightText="100"
				/>
				<Counter
					ref={numBars}
					changeNum={handleChangeNum}
					changedArray={props.changedArraySize}
					disabled={props.disableControls}
					value={props.size}
				/>
				<Range
					min="5"
					max="2000"
					value={props.speed}
					onChange={props.changedSortingSpeed}
					id="sortSpeed"
					name="sortSpeed"
					htmlFor="sortSpeed"
					label="Sorting Speed"
					leftText="Extremely Slow"
					rightText="Extremely Fast"
				/>
			</Card>
			{/* <Card>
				<h2>Options</h2>
			</Card> */}
			<div className="error-message" ref={errorMessage}>
				<p></p>
			</div>
		</div>
	);
};

Controls = forwardRef(Controls);

export default Controls;
