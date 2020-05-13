import React from "react";

import classes from "./Bar.module.css";

const Bar = (props) => {
	const height = `${props.height}px`;
	return (
		<div className={classes.Bar} style={{ height: height }}>
			{/* {props.height} */}
		</div>
	);
};

export default Bar;
