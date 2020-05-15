import React, { useState, useEffect, useRef } from "react";

import classes from "./SortingVisualizer.module.css";
import Bars from "./Bars/Bars";
import Button from "../../components/UI/Button/Button";
import { bubbleSort } from "../../sortingAlgorithms/bubbleSort";
import { getRandomNum, arraysAreEqual } from "../../utilities";

const SortingVisualizer = (props, ref) => {
	const [randomHeights, setRandomHeights] = useState([]);
	const barsContainer = useRef();

	useEffect(() => {
		handleGenerateNewArray();
	}, []);

	const handleGenerateNewArray = () => {
		const newRandomHeights = [];
		for (let i = 0; i < 100; i++) {
			newRandomHeights.push(getRandomNum(5, 450));
		}
		setRandomHeights(newRandomHeights);
	};

	const handleBubbleSort = () => {
		if (
			arraysAreEqual(
				randomHeights,
				[...randomHeights].sort((a, b) => a - b)
			)
		) {
			console.log("SORTED");
			return;
		}
		let swapOrderArray = bubbleSort(randomHeights);
		let bars = barsContainer.current.children;
		for (let i = 0; i < swapOrderArray.length; i++) {
			setTimeout(() => {
				let swapIdx1 = swapOrderArray[i][1];
				let swapIdx2 = swapOrderArray[i][2];

				bars[swapIdx1].style.height =
					swapOrderArray[i][0][swapIdx1] + "px";
				bars[swapIdx2].style.height =
					swapOrderArray[i][0][swapIdx2] + "px";
			}, i * 1);
		}
	};

	const handleMergeSort = () => {};

	const handleTestAlgorithms = () => {
		/* CHECKS IF SORT FUNCTION WORKS */
		// for (let i = 0; i < 100; i++) {
		// 	const array = [];
		// 	const length = getRandomNum(1, 1000);
		// 	for (let i = 0; i < length; i++) {
		// 		array.push(getRandomNum(-1000, 1000));
		// 	}
		// 	const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
		// 	const mergeSortedArray = bubbleSort(array.slice());
		// 	console.log(
		// 		arraysAreEqual(javaScriptSortedArray, mergeSortedArray)
		// 	);
		// }
		/* CHECKS IF DOM HEIGHTS MATCH SORTED RANDOM HEIGHTS*/
		const sortedRandomHeights = [...randomHeights].sort((a, b) => a - b);
		const barsDOM = document.getElementsByClassName("bar");
		for (let i = 0; i < barsDOM.length; i++) {
			console.log(
				barsDOM[i].style.height === sortedRandomHeights[i] + "px"
			);
		}
	};

	return (
		<div className={classes.SortingVisualizer}>
			<Bars ref={barsContainer} heights={randomHeights}></Bars>
			<Button clicked={handleGenerateNewArray}>
				Generate New Random Array
			</Button>
			<Button clicked={handleMergeSort}>Merge Sort!</Button>
			<Button clicked={handleBubbleSort}>Bubble Sort!</Button>
			<Button clicked={handleTestAlgorithms}>Test!</Button>
		</div>
	);
};

export default SortingVisualizer;
