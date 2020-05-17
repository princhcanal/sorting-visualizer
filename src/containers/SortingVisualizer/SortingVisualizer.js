import React, { useState, useEffect, useRef } from "react";

import classes from "./SortingVisualizer.module.css";
import Bars from "./Bars/Bars";
import Button from "../../components/UI/Button/Button";
import { bubbleSort } from "../../sortingAlgorithms/bubbleSort";
import { selectionSort } from "../../sortingAlgorithms/selectionSort";
import { insertionSort } from "../../sortingAlgorithms/insertionSort";
import { mergeSortIterative } from "../../sortingAlgorithms/mergeSort";
import { getRandomNum, arraysAreEqual } from "../../utilities";

const COLOR_DEFAULT = "#577590";
const COLOR_COMPARING = "#f9c74f";
const COLOR_SWAP = "#f94144";
const COLOR_SORTED = "#90be6d";
let NUM_BARS = 10;
let SORTING_SPEED = 200;

const getRandomArray = () => {
	const newRandomHeights = [];
	for (let i = 0; i < NUM_BARS; i++) {
		newRandomHeights.push(getRandomNum(5, 450));
	}
	return newRandomHeights;
};

const SortingVisualizer = (props) => {
	const [randomHeights, setRandomHeights] = useState(getRandomArray());
	const [isSorting, setIsSorting] = useState(false);
	const barsContainer = useRef();

	useEffect(() => {
		// handleGenerateNewArray();
		// console.log(barsContainer.current.classList);
		console.log("updated");
	}, []);

	const handleGenerateNewArray = () => {
		const newRandomHeights = [];
		const bars = barsContainer.current.children;
		for (let i = 0; i < NUM_BARS; i++) {
			newRandomHeights.push(getRandomNum(5, 450));
			bars[i].style.backgroundColor = COLOR_DEFAULT;
		}
		setRandomHeights(newRandomHeights);
	};

	const handleBubbleSort = () => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let swapOrderArray = bubbleSort([...randomHeights]);
		let bars = barsContainer.current.children;

		for (let i = 0; i < swapOrderArray.length; i++) {
			let state = swapOrderArray[i][3];
			let swapIdx1 = swapOrderArray[i][1];
			let swapIdx2 = swapOrderArray[i][2];
			setTimeout(() => {
				if (state === "COMPARING") {
					bars[swapIdx1].style.backgroundColor = COLOR_COMPARING;
					bars[swapIdx2].style.backgroundColor = COLOR_COMPARING;
					if (swapIdx1 !== 0) {
						bars[
							swapIdx1 - 1
						].style.backgroundColor = COLOR_DEFAULT;
					}
				} else if (state === "SWAPPING-1") {
					bars[swapIdx1].style.backgroundColor = COLOR_SWAP;
					bars[swapIdx2].style.backgroundColor = COLOR_SWAP;
				} else if (state === "SWAPPING-2") {
					bars[swapIdx1].style.height =
						swapOrderArray[i][0][swapIdx1] + "px";
					bars[swapIdx2].style.height =
						swapOrderArray[i][0][swapIdx2] + "px";
				} else if (state === "SWAPPING-3") {
					bars[swapIdx1].style.backgroundColor = COLOR_DEFAULT;
					bars[swapIdx2].style.backgroundColor = COLOR_DEFAULT;
				} else if (state === "LAST-SORTED") {
					bars[swapIdx2].style.backgroundColor = COLOR_SORTED;
					if (swapIdx1 >= 0)
						bars[swapIdx1].style.backgroundColor = COLOR_DEFAULT;
				} else if (state === "ALL-SORTED-1") {
					barsContainer.current.classList.add("sorted");
					setIsSorting(false);
					setRandomHeights(swapOrderArray[i][0]);
				}
			}, i * SORTING_SPEED);
		}
	};

	const handleSelectionSort = () => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let swapOrderArray = selectionSort([...randomHeights]);
		let bars = barsContainer.current.children;

		for (let i = 0; i < swapOrderArray.length; i++) {
			let state = swapOrderArray[i][3];
			let swapIdx1 = swapOrderArray[i][1];
			let swapIdx2 = swapOrderArray[i][2];
			setTimeout(() => {
				if (state === "GET-INITIAL") {
					bars[swapIdx1].style.backgroundColor = COLOR_SWAP;
				} else if (state === "CHECK-MIN") {
					bars[swapIdx1].style.backgroundColor = COLOR_COMPARING;
				} else if (state === "CHANGE-BACK") {
					bars[swapIdx1].style.backgroundColor = COLOR_DEFAULT;
				} else if (state === "CHANGE-MIN") {
					bars[swapIdx1].style.backgroundColor = COLOR_SWAP;
					if (swapIdx2) {
						bars[swapIdx2].style.backgroundColor = COLOR_DEFAULT;
					}
				} else if (state === "SWAPPING-1") {
					bars[swapIdx1].style.height =
						swapOrderArray[i][0][swapIdx1] + "px";
					bars[swapIdx2].style.height =
						swapOrderArray[i][0][swapIdx2] + "px";
				} else if (state === "SWAPPING-2") {
					bars[swapIdx1].style.backgroundColor = COLOR_SORTED;
					bars[swapIdx2].style.backgroundColor = COLOR_DEFAULT;
				} else if (state === "NO-SWAP") {
					bars[swapIdx1].style.backgroundColor = COLOR_SORTED;
				} else if (state === "ALL-SORTED") {
					barsContainer.current.classList.add("sorted");
					setIsSorting(false);
					setRandomHeights(swapOrderArray[i][0]);
				}
			}, i * SORTING_SPEED);
		}
	};

	const handleInsertionSort = () => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let swapOrderArray = insertionSort([...randomHeights]);
		let bars = barsContainer.current.children;

		for (let i = 0; i < swapOrderArray.length; i++) {
			let state = swapOrderArray[i][3];
			let swapIdx1 = swapOrderArray[i][1];
			let swapIdx2 = swapOrderArray[i][2];
			setTimeout(() => {
				if (state === "START") {
					bars[swapIdx1].style.backgroundColor = COLOR_COMPARING;
				} else if (state === "SWAP-1") {
					bars[swapIdx1].style.backgroundColor = COLOR_COMPARING;
					// bars[swapIdx2].style.backgroundColor = COLOR_COMPARING;
				} else if (state === "SWAP-2") {
					bars[swapIdx1].style.backgroundColor = COLOR_SWAP;
					bars[swapIdx2].style.backgroundColor = COLOR_SWAP;
				} else if (state === "SWAP-3") {
					bars[swapIdx1].style.height =
						swapOrderArray[i][0][swapIdx1] + "px";
					bars[swapIdx2].style.height =
						swapOrderArray[i][0][swapIdx2] + "px";
				} else if (state === "SWAP-4") {
					bars[swapIdx1].style.backgroundColor = COLOR_COMPARING;
					bars[swapIdx2].style.backgroundColor = COLOR_DEFAULT;
				} else if (state === "DONE-1") {
					bars[swapIdx1].style.backgroundColor = COLOR_COMPARING;
				} else if (state === "DONE-2") {
					console.log(swapIdx1, swapIdx2);
					if (swapIdx1 >= 0)
						bars[swapIdx1].style.backgroundColor = COLOR_DEFAULT;
					bars[swapIdx2].style.backgroundColor = COLOR_SORTED;
				} else if (state === "DONE-3") {
					bars[swapIdx2].style.backgroundColor = COLOR_DEFAULT;
				} else if (state === "SORTED") {
					bars[swapIdx2].style.backgroundColor = COLOR_DEFAULT;
				} else if (state === "ALL-SORTED") {
					barsContainer.current.classList.add("sorted");
					setIsSorting(false);
					setRandomHeights(swapOrderArray[i][0]);
				}
			}, i * SORTING_SPEED);
		}
	};

	const handleMergeSortIterative = () => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let swapOrderArray = mergeSortIterative([...randomHeights]);
		let bars = barsContainer.current.children;

		for (let i = 0; i < swapOrderArray.length; i++) {
			let state = swapOrderArray[i][3];
			let swapIdx1 = swapOrderArray[i][1];
			let swapIdx2 = swapOrderArray[i][2];
			setTimeout(() => {
				if (state === "COMPARING") {
					bars[swapIdx1].style.backgroundColor = COLOR_COMPARING;
					bars[swapIdx2].style.backgroundColor = COLOR_COMPARING;
				} else if (state === "CASE-LEFT") {
					bars[swapIdx1].style.backgroundColor = COLOR_DEFAULT;
					bars[swapIdx2].style.backgroundColor = COLOR_DEFAULT;
				} else if (state === "CASE-RIGHT-INIT") {
					bars[swapIdx1].style.backgroundColor = COLOR_SWAP;
					bars[swapIdx2].style.backgroundColor = COLOR_SWAP;
				} else if (state === "CASE-RIGHT-SHIFT") {
					for (let j = swapIdx2; j >= swapIdx1; j--) {
						bars[j].style.height = swapOrderArray[i][0][j] + "px";
					}
					bars[swapIdx2].style.backgroundColor = COLOR_DEFAULT;
					bars[swapIdx1 + 1].style.backgroundColor = COLOR_SWAP;
				} else if (state === "CASE-RIGHT-REVERT") {
					bars[swapIdx1].style.backgroundColor = "black";
					bars[swapIdx2].style.backgroundColor = "black";
					// bars[swapIdx1].style.backgroundColor = COLOR_DEFAULT;
					// bars[swapIdx2].style.backgroundColor = COLOR_DEFAULT;
				} else if (state === "ALL-SORTED") {
					barsContainer.current.classList.add("sorted");
					setIsSorting(false);
					setRandomHeights(swapOrderArray[i][0]);
				}
			}, i * SORTING_SPEED * 5);
		}
	};

	const handleMergeSortRecursive = () => {};

	const handleQuickSort = () => {};

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
			<Button disabled={isSorting} clicked={handleGenerateNewArray}>
				Generate New Random Array
			</Button>
			<Button disabled={isSorting} clicked={handleBubbleSort}>
				Bubble Sort!
			</Button>
			<Button disabled={isSorting} clicked={handleSelectionSort}>
				Selection Sort!
			</Button>
			<Button disabled={isSorting} clicked={handleInsertionSort}>
				Insertion Sort!
			</Button>
			<Button disabled={isSorting} clicked={handleMergeSortIterative}>
				Merge Sort (Iterative)!
			</Button>
			<Button disabled notfinished clicked={handleMergeSortRecursive}>
				Merge Sort (Recursive)!
			</Button>
			<Button disabled notfinished clicked={handleQuickSort}>
				Quick Sort!
			</Button>
			<Button clicked={handleTestAlgorithms}>Test!</Button>
		</div>
	);
};

export default SortingVisualizer;
