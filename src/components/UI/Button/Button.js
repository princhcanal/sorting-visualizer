import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
	return (
		<button
			disabled={props.disabled}
			className={classes.Button}
			onClick={props.clicked}
		>
			{props.children}
		</button>
	);
};

export default Button;
