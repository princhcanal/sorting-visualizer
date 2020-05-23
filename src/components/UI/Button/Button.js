import React from "react";

const Button = (props) => {
	return (
		<button
			disabled={props.disabled}
			className="button"
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
