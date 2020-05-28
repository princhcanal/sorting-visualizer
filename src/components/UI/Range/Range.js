import React from "react";

const Range = (props) => {
	return (
		<div className="range">
			<label htmlFor={props.htmlFor}>{props.label}</label>
			<input
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

export default Range;
