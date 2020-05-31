import React, { useRef, useImperativeHandle, forwardRef } from "react";

let Bar = (props, ref) => {
	let oneBar = useRef();

	useImperativeHandle(ref, () => ({
		style: oneBar.current.style,
	}));
	const height = `${props.height}px`;
	const margin = props.moreMargin ? "0.1rem" : "0.05rem";
	const classNames = ["bar"];

	return (
		<div
			className={classNames.join(" ")}
			style={{ height: height, margin: `0.5rem ${margin}` }}
			ref={oneBar}
		>
			<p>{props.children}</p>
		</div>
	);
};

Bar = forwardRef(Bar);

export default Bar;
