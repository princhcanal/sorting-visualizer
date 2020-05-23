import React from "react";

const Button = (props) => {
	let classNames = ["button", props.classNames];
	return (
		<button
			disabled={props.disabled}
			className={classNames.join(" ")}
			onClick={props.clicked}
		>
			{props.children}
			{props.notfinished && (
				<div>
					<em>Coming Soon</em>
				</div>
			)}
		</button>
	);
};

export default Button;
