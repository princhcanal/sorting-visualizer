import React from "react";

import ColorStatus from "./ColorStatus/ColorStatus";

const ColorLegend = (props) => {
	let statuses = props.statuses.map((status, i) => {
		return (
			<ColorStatus
				key={i}
				color={status.color !== "" ? status.color : "none"}
			>
				{status.desc}
			</ColorStatus>
		);
	});
	return <div className="color-legend">{statuses}</div>;
};

export default ColorLegend;
