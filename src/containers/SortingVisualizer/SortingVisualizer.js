import React, { useState, useEffect, useRef } from "react";

import classes from "./SortingVisualizer.module.css";
import Bars from "./Bars/Bars";
import Button from "../../components/UI/Button/Button";
import { bubbleSort } from "../../sortingAlgorithms/bubbleSort";
import { selectionSort } from "../../sortingAlgorithms/selectionSort";
import { insertionSort } from "../../sortingAlgorithms/insertionSort";
import {
	mergeSortIterative,
	getMergeSortRecursiveSwapOrder,
} from "../../sortingAlgorithms/mergeSort";
import { getQuickSortSwapOrder } from "../../sortingAlgorithms/quickSort";
import { getRandomNum, RANDOM_COLORS } from "../../utilities";

const COLOR_DEFAULT = "#577590";
const COLOR_COMPARING = "#f9c74f";
const COLOR_SWAP = "#f94144";
const COLOR_SORTED = "#90be6d";
let NUM_BARS = 100;
let SORTING_SPEED = 1;

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
		// console.log("updated");
	}, []);

	const handleGenerateNewArray = () => {
		const newRandomHeights = [];
		const bars = barsContainer.current.children;
		for (let i = 0; i < NUM_BARS; i++) {
			newRandomHeights.push(getRandomNum(5, 450));
			bars[i].style.backgroundColor = COLOR_DEFAULT;
			// bars[i].style.backgroundColor = getRandomColor();
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

	const handleMergeSort = (mergeSortType) => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let swapOrderArray = mergeSortType([...randomHeights]);
		let bars = barsContainer.current.children;
		let prevColor1 = COLOR_DEFAULT;
		let prevColor2 = COLOR_DEFAULT;
		let count = getRandomNum(0, RANDOM_COLORS.length - 1);
		let color = RANDOM_COLORS[count];

		for (let i = 0; i < swapOrderArray.length; i++) {
			let state = swapOrderArray[i][3];
			let swapIdx1 = swapOrderArray[i][1];
			let swapIdx2 = swapOrderArray[i][2];
			// eslint-disable-next-line no-loop-func
			setTimeout(() => {
				if (state === "COMPARING") {
					prevColor1 = bars[swapIdx1].style.backgroundColor;
					prevColor2 = bars[swapIdx2].style.backgroundColor;
					bars[swapIdx1].style.backgroundColor = COLOR_COMPARING;
					bars[swapIdx2].style.backgroundColor = COLOR_COMPARING;
				} else if (state === "CASE-LEFT") {
					bars[swapIdx1].style.backgroundColor = color;
					bars[swapIdx2].style.backgroundColor = prevColor2;
				} else if (state === "CASE-RIGHT-INIT") {
					bars[swapIdx1].style.backgroundColor = COLOR_SWAP;
					bars[swapIdx2].style.backgroundColor = COLOR_SWAP;
				} else if (state === "CASE-RIGHT-SHIFT") {
					for (let j = swapIdx2; j >= swapIdx1; j--) {
						bars[j].style.height = swapOrderArray[i][0][j] + "px";
					}
					bars[swapIdx2].style.backgroundColor = prevColor1;
					bars[swapIdx1 + 1].style.backgroundColor = COLOR_SWAP;
				} else if (state === "CASE-RIGHT-REVERT") {
					bars[swapIdx1].style.backgroundColor = color;
					bars[swapIdx2].style.backgroundColor = prevColor1;
				} else if (state === "ONE-SIDE") {
					bars[swapIdx1].style.backgroundColor = color;
				} else if (state === "MERGED") {
					color = RANDOM_COLORS[++count % RANDOM_COLORS.length];
				} else if (state === "ALL-SORTED") {
					barsContainer.current.classList.add("sorted");
					setIsSorting(false);
					setRandomHeights(swapOrderArray[i][0]);
				}
			}, i * SORTING_SPEED * 10);
		}
	};

	const handleQuickSort = () => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let swapOrderArray = getQuickSortSwapOrder(
			[...randomHeights],
			0,
			NUM_BARS - 1,
			[]
		);
		let bars = barsContainer.current.children;
		let randomColor = "#EFD6AC";

		for (let i = 0; i < swapOrderArray.length; i++) {
			let state = swapOrderArray[i][3];
			let swapIdx1 = swapOrderArray[i][1];
			let swapIdx2 = swapOrderArray[i][2];
			setTimeout(() => {
				if (state === "GET-PIVOT") {
					bars[swapIdx1].style.backgroundColor = COLOR_SWAP;
				} else if (state === "COMPARE") {
					bars[swapIdx1].style.backgroundColor = COLOR_COMPARING;
				} else if (state === "REVERT") {
					bars[swapIdx1].style.backgroundColor = randomColor;
				} else if (state === "SWAP-1") {
					// bars[swapIdx1].style.backgroundColor = "#FF784F";
					bars[swapIdx2].style.backgroundColor = "#FF784F";
				} else if (state === "SAME-INDEX") {
					bars[swapIdx1].style.backgroundColor = "#1B5299";
				} else if (state === "SWAP-2") {
					bars[swapIdx1].style.backgroundColor = "#FF784F";
				} else if (state === "SWAP-3") {
					bars[swapIdx1].style.height =
						swapOrderArray[i][0][swapIdx1] + "px";
					bars[swapIdx2].style.height =
						swapOrderArray[i][0][swapIdx2] + "px";
				} else if (state === "SWAP-4") {
					bars[swapIdx1].style.backgroundColor = "#1B5299";
					bars[swapIdx2].style.backgroundColor = randomColor;
				} else if (state === "SWAP-PIVOT-1") {
					bars[swapIdx2].style.backgroundColor = COLOR_SWAP;
				} else if (state === "SWAP-PIVOT-2") {
					bars[swapIdx1].style.height =
						swapOrderArray[i][0][swapIdx1] + "px";
					bars[swapIdx2].style.height =
						swapOrderArray[i][0][swapIdx2] + "px";
				} else if (state === "SWAP-PIVOT-3") {
					bars[swapIdx1].style.backgroundColor = "#1B5299";
					bars[swapIdx2].style.backgroundColor = COLOR_SORTED;
				} else if (state === "NO-CHANGE") {
					bars[swapIdx1].style.backgroundColor = COLOR_SORTED;
				} else if (state === "REVERT-ALL-1") {
					for (let j = swapIdx1; j < swapIdx2; j++) {
						bars[j].style.backgroundColor = COLOR_DEFAULT;
					}
				} else if (state === "REVERT-ALL-2") {
					for (let j = swapIdx1; j < swapIdx2; j++) {
						bars[j].style.backgroundColor = COLOR_DEFAULT;
					}
				} else if (state === "SORTED-1") {
					bars[swapIdx1].style.backgroundColor = COLOR_SWAP;
				} else if (state === "SORTED-2") {
					bars[swapIdx1].style.backgroundColor = COLOR_SORTED;
				} else if (state === "ALL-SORTED") {
					barsContainer.current.classList.add("sorted");
					setIsSorting(false);
					setRandomHeights(swapOrderArray[i][0]);
				}
			}, i * SORTING_SPEED * 10);
		}
	};

	const handleShellSort = () => {};

	const handleHeapSort = () => {};

	const handleRadixSort = () => {};

	const handleTestAlgorithms = () => {
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
			<Button
				disabled={isSorting}
				clicked={() => handleMergeSort(mergeSortIterative)}
			>
				Merge Sort (Iterative)!
			</Button>
			<Button
				disabled={isSorting}
				clicked={() => handleMergeSort(getMergeSortRecursiveSwapOrder)}
			>
				Merge Sort (Recursive)!
			</Button>
			<Button disabled={isSorting} clicked={handleQuickSort}>
				Quick Sort!
			</Button>
			<Button disabled notfinished clicked={handleShellSort}>
				Shell Sort!
			</Button>
			<Button disabled notfinished clicked={handleHeapSort}>
				Heap Sort!
			</Button>
			<Button disabled notfinished clicked={handleRadixSort}>
				Radix Sort!
			</Button>
			<Button clicked={handleTestAlgorithms}>Test!</Button>
		</div>
	);
};

export default SortingVisualizer;
