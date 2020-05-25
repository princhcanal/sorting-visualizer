import React from "react";

const ColorStatus = (props) => {
	return (
		<div className="color-status">
			<div
				className="color-square"
				style={{ backgroundColor: props.color }}
			></div>
			<div className="color-desc">{props.children}</div>
		</div>
	);
};

export default ColorStatus;
