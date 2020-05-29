import React from "react";

const ColorStatus = (props) => {
	let classNames = ["color-square"];
	if (props.color === "none") {
		classNames = [""];
	}
	return (
		<div className="color-status">
			<div
				className={classNames.join(" ")}
				style={{ backgroundColor: props.color }}
			></div>
			<div className="color-desc">{props.children}</div>
		</div>
	);
};

export default ColorStatus;
