import React, { useState, useEffect, useRef } from "react";

import classes from "./SortingVisualizer.module.css";
import Bars from "./Bars/Bars";
import Controls from "./Controls/Controls";
import { bubbleSort } from "../../sortingAlgorithms/bubbleSort";
import { selectionSort } from "../../sortingAlgorithms/selectionSort";
import { insertionSort } from "../../sortingAlgorithms/insertionSort";
import {
	// mergeSortIterative,
	getMergeSortRecursiveSwapOrder,
} from "../../sortingAlgorithms/mergeSort";
import { getQuickSortSwapOrder } from "../../sortingAlgorithms/quickSort";
import { getRandomNum, RANDOM_COLORS } from "../../utilities";

const COLOR_DEFAULT = "#577590";
const COLOR_COMPARING = "#f9c74f";
const COLOR_SWAP = "#f94144";
const COLOR_SORTED = "#90be6d";
let MIN_HEIGHT = 5;
let MAX_HEIGHT = 300;
let SORTING_SPEED = 5;
let NUM_BARS = 100;

const SortingVisualizer = (props) => {
	const [randomHeights, setRandomHeights] = useState();
	const [isSorting, setIsSorting] = useState(false);
	const [disableControls, setDisableControls] = useState(false);
	const [numBars, setNumBars] = useState(NUM_BARS);
	const [sortingSpeed, setSortingSpeed] = useState(SORTING_SPEED);
	const [sortingFunction, setSortingFunction] = useState();
	const [changeToDefault, setChangeToDefault] = useState(false);
	const [sortingConfig, setSortingConfig] = useState({});
	const barsContainer = useRef();
	const errorMessage = useRef();

	useEffect(() => {
		setSortingFunction(() => () =>
			handleMergeSort(getMergeSortRecursiveSwapOrder)
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (disableControls) return;
		handleGenerateNewArray();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [numBars]);

	useEffect(() => {
		handleColorNewBars();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [randomHeights]);

	useEffect(() => {
		setSortingFunction(() => sortingFunction);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [randomHeights]);

	const handleGenerateNewArray = () => {
		const newRandomHeights = [];
		for (let i = 0; i < numBars; i++) {
			newRandomHeights.push(getRandomNum(MIN_HEIGHT, MAX_HEIGHT));
		}
		setChangeToDefault(true);
		setRandomHeights(newRandomHeights);
	};

	const handleColorNewBars = () => {
		if (changeToDefault) {
			let bars = barsContainer.current.children;
			for (let i = 0; i < numBars; i++) {
				bars[i].style.backgroundColor = COLOR_DEFAULT;
			}
		}
	};

	const handleChangeArraySize = (event) => {
		let value = event.target.value;
		setNumBars(value);
		handleShowError(value);
	};

	const handleShowError = (value) => {
		errorMessage.current.classList.remove("show-error");
		setDisableControls(false);
		if (value < 5 || value > 100 || isNaN(value)) {
			errorMessage.current.children[0].innerHTML = "INVALID: ";
			if (value < 5) {
				errorMessage.current.children[0].innerHTML +=
					"input less than minimum";
			} else if (value > 100) {
				errorMessage.current.children[0].innerHTML +=
					"input more than maximum";
			} else if (isNaN(value)) {
				errorMessage.current.children[0].innerHTML +=
					"input not a number";
			}
			errorMessage.current.classList.add("show-error");
			setDisableControls(true);
		}
	};

	const handleChangeSortingSpeed = (event) => {
		setSortingSpeed(event.target.value);
	};

	const handleBubbleSort = (config, heights, speed) => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let swapOrderArray = bubbleSort([...heights]);
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
					setChangeToDefault(false);
					setIsSorting(false);
					setRandomHeights(swapOrderArray[i][0]);
				}
			}, i * speed);
		}
	};

	const handleSelectionSort = (config, heights, speed) => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let swapOrderArray = selectionSort([...heights]);
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
					setChangeToDefault(false);
					setIsSorting(false);
					setRandomHeights(swapOrderArray[i][0]);
				}
			}, i * speed);
		}
	};

	const handleInsertionSort = (config, heights, speed) => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let swapOrderArray = insertionSort([...heights]);
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
					setChangeToDefault(false);
					setIsSorting(false);
					setRandomHeights(swapOrderArray[i][0]);
				}
			}, i * speed);
		}
	};

	const handleMergeSort = (config, heights, speed) => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let swapOrderArray = config.implementation([...heights]);
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
					setChangeToDefault(false);
					setIsSorting(false);
					setRandomHeights(swapOrderArray[i][0]);
				}
			}, i * speed);
		}
	};

	const handleQuickSort = (config, heights, speed) => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let swapOrderArray = getQuickSortSwapOrder(
			[...heights],
			0,
			heights.length - 1,
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
					setChangeToDefault(false);
					setIsSorting(false);
					setRandomHeights(swapOrderArray[i][0]);
				}
			}, i * speed);
		}
	};

	const handleChangeSortingFunction = (event) => {
		switch (event.target.value) {
			case "BubbleSort":
				setSortingFunction(() => handleBubbleSort);
				break;
			case "SelectionSort":
				setSortingFunction(() => handleSelectionSort);
				break;
			case "InsertionSort":
				setSortingFunction(() => handleInsertionSort);
				break;
			case "MergeSort":
				setSortingConfig({
					implementation: getMergeSortRecursiveSwapOrder,
				});
				setSortingFunction(() => handleMergeSort);
				break;
			case "QuickSort":
				setSortingFunction(() => handleQuickSort);
				break;
			default:
				break;
		}
	};

	// const handleShellSort = () => {};

	// const handleHeapSort = () => {};

	// const handleRadixSort = () => {};

	// const handleTestAlgorithms = () => {
	// 	/* CHECKS IF DOM HEIGHTS MATCH SORTED RANDOM HEIGHTS*/
	// 	// const sortedRandomHeights = [...randomHeights].sort((a, b) => a - b);
	// 	// const barsDOM = document.getElementsByClassName("bar");
	// 	// for (let i = 0; i < barsDOM.length; i++) {
	// 	// 	console.log(
	// 	// 		barsDOM[i].style.height === sortedRandomHeights[i] + "px"
	// 	// 	);
	// 	// }
	// };

	return (
		<div className={classes.SortingVisualizer}>
			<div className={classes.Bars}>
				<Bars
					ref={barsContainer}
					heights={randomHeights}
					speed={sortingSpeed}
					sortConfig={sortingConfig}
					disableControls={disableControls}
					isSorting={isSorting}
					changedSortingFunction={handleChangeSortingFunction}
					generateNewArray={handleGenerateNewArray}
					sort={
						sortingFunction
							? sortingFunction
							: () =>
									handleMergeSort(
										{
											implementation: getMergeSortRecursiveSwapOrder,
										},
										randomHeights,
										sortingSpeed
									)
					}
				></Bars>
			</div>
			<div className={classes.Controls}>
				<Controls
					ref={errorMessage}
					heights={randomHeights}
					size={numBars}
					speed={sortingSpeed}
					sort={
						sortingFunction
							? sortingFunction
							: () =>
									handleMergeSort(
										{
											implementation: getMergeSortRecursiveSwapOrder,
										},
										randomHeights,
										sortingSpeed
									)
					}
					sortConfig={sortingConfig}
					generateNewArray={handleGenerateNewArray}
					disableControls={isSorting}
					changedArraySize={handleChangeArraySize}
					changedSortingSpeed={handleChangeSortingSpeed}
					changedSortingFunction={handleChangeSortingFunction}
				/>
			</div>
		</div>
	);
};

export default SortingVisualizer;
