import React, { useState, useEffect } from "react";

import classes from "./SortingVisualizer.module.css";
import Bars from "./Bars/Bars";

const SortingVisualizer = (props) => {
	const [randomHeights, setRandomHeights] = useState([]);

	useEffect(() => {
		handleGenerateNewArray();
	}, []);

	const handleGenerateNewArray = () => {
		const newRandomHeights = [];
		for (let i = 0; i < 100; i++) {
			newRandomHeights.push(getRandomNum(5, 500));
		}
		setRandomHeights(newRandomHeights);
	};

	return (
		<div className={classes.SortingVisualizer}>
			<Bars heights={randomHeights}></Bars>
			<button onClick={handleGenerateNewArray}>
				Generate New Random Array
			</button>
		</div>
	);
};

function getRandomNum(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default SortingVisualizer;
