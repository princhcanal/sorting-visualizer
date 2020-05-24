import React, { useRef, useImperativeHandle, forwardRef } from "react";

// import { getRandomColor } from "../../../../utilities";

let Bar = (props, ref) => {
	let oneBar = useRef();

	useImperativeHandle(ref, () => ({
		style: oneBar.current.style,
	}));
	const height = `${props.height}px`;
	const classNames = ["bar"];

	return (
		<div
			className={classNames.join(" ")}
			style={{ height: height }}
			ref={oneBar}
		>
			<p>{props.children}</p>
		</div>
	);
};

Bar = forwardRef(Bar);

export default Bar;
