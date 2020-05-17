import React from "react";

import classes from "./Bar.module.css";
// import { getRandomColor } from "../../../../utilities";

const Bar = (props) => {
	const height = `${props.height}px`;
	const classNames = [classes.Bar, "bar"];
	return (
		<div className={classNames.join(" ")} style={{ height: height }}>
			{/* {props.height} */}
		</div>
	);
};

export default Bar;
