import React, { useState, useEffect } from "react";

import classes from "./SortingVisualizer.module.css";
import Bars from "./Bars/Bars";
import Button from "../../components/UI/Button/Button";
import { bubbleSort } from "../../sortingAlgorithms/bubbleSort";

const SortingVisualizer = (props) => {
	const [randomHeights, setRandomHeights] = useState([]);
	// const [swapOrderArray, setSwapOrderArray] = useState([])

	useEffect(() => {
		handleGenerateNewArray();
		console.log("updated");
	}, []);

	const handleGenerateNewArray = () => {
		const newRandomHeights = [];
		for (let i = 0; i < 100; i++) {
			newRandomHeights.push(getRandomNum(5, 400));
		}
		setRandomHeights(newRandomHeights);
	};

	const handleBubbleSort = () => {
		/* BUG: heights from randomHeights does not match height attributes of bars */
		// const copyRandomHeights = [...randomHeights];
		// const sortedRandomHeights = copyRandomHeights.sort((a, b) => a - b);
		// if (arraysAreEqual(randomHeights, sortedRandomHeights)) {
		// 	console.log("sorted");
		// 	console.log(randomHeights);
		// 	return;
		// }
		// let swapOrderArray = bubbleSort(randomHeights);
		// let bars = document.getElementsByClassName("bar");
		// for (let i = 0; i < swapOrderArray.length; i++) {
		// 	setTimeout(() => {
		// 		const temp = bars[swapOrderArray[i][0]].style.height;
		// 		bars[swapOrderArray[i][0]].style.height =
		// 			bars[swapOrderArray[i][1]].style.height;
		// 		bars[swapOrderArray[i][1]].style.height = temp;
		// 	}, i * 1);
		// }
		if (
			arraysAreEqual(
				randomHeights,
				[...randomHeights].sort((a, b) => a - b)
			)
		) {
			console.log("SORTED");
			return;
		}

		let swapOrderArray = bubbleSort([...randomHeights]);
		for (let i = 0; i < swapOrderArray.length; i++) {
			setTimeout(() => {
				setRandomHeights(swapOrderArray[i][0]);
			}, i * 1);
		}
		console.log([...randomHeights].sort((a, b) => a - b));
	};

	const handleMergeSort = () => {
		const copyRandomHeights = [...randomHeights];
		[copyRandomHeights[0], copyRandomHeights[1]] = [
			copyRandomHeights[1],
			copyRandomHeights[0],
		];
		setRandomHeights(copyRandomHeights);
	};

	const handleTestAlgorithms = () => {
		for (let i = 0; i < 100; i++) {
			const array = [];
			const length = getRandomNum(1, 1000);
			for (let i = 0; i < length; i++) {
				array.push(getRandomNum(-1000, 1000));
			}
			const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
			const mergeSortedArray = bubbleSort(array.slice());
			console.log(
				arraysAreEqual(javaScriptSortedArray, mergeSortedArray)
			);
		}
	};

	return (
		<div className={classes.SortingVisualizer}>
			<Bars heights={randomHeights}></Bars>
			<Button clicked={handleGenerateNewArray}>
				Generate New Random Array
			</Button>
			<Button clicked={handleMergeSort}>Merge Sort!</Button>
			<Button clicked={handleBubbleSort}>Bubble Sort!</Button>
			<Button clicked={handleTestAlgorithms}>Test!</Button>
		</div>
	);
};

function getRandomNum(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function arraysAreEqual(arrayOne, arrayTwo) {
	if (arrayOne.length !== arrayTwo.length) return false;
	for (let i = 0; i < arrayOne.length; i++) {
		if (arrayOne[i] !== arrayTwo[i]) {
			return false;
		}
	}
	return true;
}

export default SortingVisualizer;
