import React, { useRef, useImperativeHandle, forwardRef } from "react";

let Range = (props, ref) => {
	const range = useRef();

	useImperativeHandle(ref, () => ({
		value: range.current.value,
	}));

	let classNames = ["range", props.className];

	return (
		<div className={classNames.join(" ")}>
			<label htmlFor={props.htmlFor}>{props.label}</label>
			<input
				ref={range}
				type="range"
				min={props.min}
				max={props.max}
				step={props.step}
				value={props.value}
				onChange={props.onChange}
				disabled={props.disabled}
				id={props.id}
				name={props.name}
			/>
			<div className="range-labels">
				<p>{props.leftText}</p>
				<p>{props.rightText}</p>
			</div>
		</div>
	);
};

Range = forwardRef(Range);

export default Range;
