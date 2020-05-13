import React from "react";

import Bar from "./Bar/Bar";

const Bars = (props) => {
	const bars = props.heights.map((randHeight) => {
		return <Bar height={randHeight}></Bar>;
	});
	return <div>{bars}</div>;
};

export default Bars;
