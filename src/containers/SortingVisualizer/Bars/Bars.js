import React, { useRef, useImperativeHandle, forwardRef } from "react";

import Bar from "./Bar/Bar";

let Bars = (props, ref) => {
	const barsContainer = useRef();
	useImperativeHandle(ref, () => ({
		children: barsContainer.current.children,
		classList: barsContainer.current.classList,
	}));

	const bars = props.heights.map((randHeight, i) => {
		return <Bar key={i} height={randHeight}></Bar>;
	});
	return <div ref={barsContainer}>{bars}</div>;
};

Bars = forwardRef(Bars);

export default Bars;
