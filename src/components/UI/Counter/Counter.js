import React, { useRef, useImperativeHandle, forwardRef } from "react";

let Counter = (props, ref) => {
	const numBars = useRef();

	useImperativeHandle(ref, () => ({
		value: numBars.current.value,
	}));

	return (
		<div className="counter">
			<div
				className="decrement"
				onClick={() => props.changeNum("-")}
				disabled={props.disabled}
			>
				-
			</div>
			<input
				ref={numBars}
				type="number"
				value={props.value}
				onChange={(event) => {
					props.changedArray(event, numBars.current.value);
				}}
				disabled={props.disabled}
			/>
			<div
				className="increment"
				onClick={() => props.changeNum("+")}
				disabled={props.disabled}
			>
				+
			</div>
		</div>
	);
};

Counter = forwardRef(Counter);

export default Counter;
