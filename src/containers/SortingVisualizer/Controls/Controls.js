import React, { useEffect, useState } from "react";
import Card from "../../../components/UI/Card/Card";

import Button from "../../../components/UI/Button/Button";

let Controls = (props) => {
	return (
		<div className="controls">
			<Card>
				<h2>Controls</h2>
				<div className="input-group">
					<label htmlFor="arrSize">Array Size</label>
					<input
						type="range"
						min="5"
						max="100"
						value={props.size}
						onChange={props.changedArraySize}
						disabled={props.disableControls}
						id="arrSize"
						name="arrSize"
					/>

					<input
						type="number"
						value={props.size}
						onChange={props.changedArraySize}
						disabled={props.disableControls}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="sortSpeed">Sorting Speed</label>
					<input
						type="range"
						min="5"
						max="2000"
						step="5"
						value={props.speed}
						onChange={props.changedSortingSpeed}
						id="sortSpeed"
						name="sortSpeed"
					/>
					<div className="speed-labels">
						<p>Extremely Fast</p>
						<p>Extremely Slow</p>
					</div>
				</div>
			</Card>
			{/* <Card>
				<h2>Options</h2>
			</Card> */}
		</div>
	);
};

export default Controls;
