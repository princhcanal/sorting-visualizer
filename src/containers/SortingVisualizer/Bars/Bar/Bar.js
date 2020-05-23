import React from "react";

// import { getRandomColor } from "../../../../utilities";

const Bar = (props) => {
	const height = `${props.height}px`;
	const classNames = ["bar"];
	return (
		<div className={classNames.join(" ")} style={{ height: height }}>
			{/* {props.height} */}
		</div>
	);
};

export default Bar;
