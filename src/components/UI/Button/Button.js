import React from "react";

const Button = (props) => {
	let classNames = ["button", props.className];
	return (
		<button
			disabled={props.disabled}
			className={classNames.join(" ")}
			onClick={props.clicked}
		>
			{props.children}
		</button>
	);
};

export default Button;
