import React, { useRef, useImperativeHandle, forwardRef } from "react";

import Button from "../../UI/Button/Button";

let Counter = (props, ref) => {
	const numBars = useRef();

	useImperativeHandle(ref, () => ({
		value: numBars.current.value,
	}));

	return (
		<div className="counter">
			<Button
				className="decrement"
				clicked={() => props.changeNum("-")}
				disabled={props.disabled}
			>
				-
			</Button>
			<input
				ref={numBars}
				type="number"
				value={props.value}
				onChange={(event) => {
					props.changedArray(event, numBars.current.value);
				}}
				disabled={props.disabled}
			/>
			<Button
				className="increment"
				clicked={() => props.changeNum("+")}
				disabled={props.disabled}
			>
				+
			</Button>
		</div>
	);
};

Counter = forwardRef(Counter);

export default Counter;
