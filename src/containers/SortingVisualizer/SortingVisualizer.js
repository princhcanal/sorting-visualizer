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
import { getRandomNum } from "../../utilities/numbers";
import {
	RANDOM_COLORS,
	COLOR_DEFAULT,
	COLOR_COMPARING,
	COLOR_SWAP,
	COLOR_SORTED,
	COLOR_GREATER,
	COLOR_LESSER,
	COLOR_SWAP_LESSER,
} from "../../utilities/colors";
import {
	bubbleSortLegend,
	selectionSortLegend,
	insertionSortLegend,
	mergeSortLegend,
	quickSortLegend,
} from "../../utilities/legends";
import Button from "../../components/UI/Button/Button";

const MIN_HEIGHT = 25;
const MAX_HEIGHT = 300;
let SORTING_SPEED = 5;
const NUM_BARS = 100;

// TODO: add pause and step functionality
// TODO: add change speed while sorting functionality
// TODO: add sorting configurations
// TODO: add sorting info
// TODO (MAYBE): add sudo code functionality
const SortingVisualizer = (props) => {
	const [randomHeights, setRandomHeights] = useState();
	const [isSorting, setIsSorting] = useState(false);
	const [disableControls, setDisableControls] = useState(false);
	const [numBars, setNumBars] = useState(NUM_BARS);
	const [sortingSpeed, setSortingSpeed] = useState(SORTING_SPEED);
	const [sortingFunction, setSortingFunction] = useState();
	const [changeToDefault, setChangeToDefault] = useState(false);
	const [sortingConfig, setSortingConfig] = useState({});
	const [showHeights, setShowHeights] = useState(false);
	const [legend, setLegend] = useState([{}]);
	const [swapOrder, setSwapOrder] = useState([]);
	const [setTimeouts, setSetTimeouts] = useState([]);
	const [paused, setPaused] = useState(true);
	const [indexPaused, setIndexPaused] = useState(0);
	const barsContainer = useRef();
	const errorMessage = useRef();

	useEffect(() => {
		handleChangeSortingFunction("Merge Sort");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (barsContainer.current.children[0]) handleShowInvalid(numBars);
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

	useEffect(() => {
		if (!paused && sortingFunction) {
			sortingFunction(
				swapOrder,
				randomHeights.length,
				sortingSpeed,
				setTimeouts
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paused]);

	const handleGenerateNewArray = () => {
		const newRandomHeights = [];
		for (let i = 0; i < numBars; i++) {
			newRandomHeights.push(getRandomNum(MIN_HEIGHT, MAX_HEIGHT));
			// newRandomHeights.push(MAX_HEIGHT);
		}
		setChangeToDefault(true);
		setRandomHeights(newRandomHeights);
		setSetTimeouts([]);
		setSwapOrder([]);
	};

	const handleColorNewBars = () => {
		if (changeToDefault) {
			let bars = barsContainer.current.children;
			for (let i = 0; i < numBars; i++) {
				bars[i].style.backgroundColor = COLOR_DEFAULT;
			}
		}
	};

	const handleChangeArraySize = (event, value) => {
		let val;
		if (event === null) {
			val = value;
		} else {
			val = event.target.value;
		}
		if (val <= 20) {
			setShowHeights(true);
		} else {
			setShowHeights(false);
		}
		setNumBars(val);
		handleShowError(val);
	};

	const handleShowInvalid = (value) => {
		if (barsContainer.current.children[0].classList[0] === "bar") return;
		if (value < 5 || value > 100 || isNaN(value)) {
			barsContainer.current.children[0].classList.remove("hide-invalid");
		} else {
			barsContainer.current.children[0].classList.add("hide-invalid");
		}
	};

	const handleShowError = (value) => {
		errorMessage.current.classList.remove("show-error");
		setDisableControls(false);
		if (value < 5 || value > 100 || isNaN(value)) {
			errorMessage.current.children[0].innerHTML = "INVALID: ";
			if (value < 5) {
				errorMessage.current.children[0].innerHTML +=
					"Input less than minimum";
			} else if (value > 100) {
				errorMessage.current.children[0].innerHTML +=
					"Input more than maximum";
			} else if (isNaN(value)) {
				errorMessage.current.children[0].innerHTML +=
					"Input not a number";
			}
			errorMessage.current.classList.add("show-error");
			setDisableControls(true);
		}
	};

	const handleChangeSortingSpeed = (event) => {
		setSortingSpeed(event.target.value);
	};

	const handlePause = (swapOrderArray, timeouts, indexPaused) => {
		for (let i = indexPaused; i < timeouts.length; i++) {
			clearTimeout(timeouts[i]);
		}
		setIsSorting(false);
		setPaused(true);
		setSwapOrder(swapOrderArray.slice(indexPaused));
	};

	const handleSort = (config, heights) => {
		if (!sortingFunction) {
			handleChangeSortingFunction("Merge Sort");
		}
		if (!paused || swapOrder.length === 0) {
			let swapOrderArray = config.implementation(
				[...heights],
				...config.args
			);
			setSwapOrder(swapOrderArray);
		}
		setPaused(false);
	};

	const handleBubbleSort = (animations, numOfBars, speed, timeouts) => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let bars = barsContainer.current.children;
		let callbacks = [];
		// handleColorNewBars();

		for (let i = 0; i < animations.length; i++) {
			let state = animations[i][3];
			let swapIdx1 = animations[i][1];
			let swapIdx2 = animations[i][2];

			callbacks.push(() => {
				setIndexPaused(i); // find a better way
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
						animations[i][0][swapIdx1] + "px";
					bars[swapIdx2].style.height =
						animations[i][0][swapIdx2] + "px";
					if (numOfBars <= 20) {
						bars[swapIdx1].children[0].innerHTML =
							animations[i][0][swapIdx1];
						bars[swapIdx2].children[0].innerHTML =
							animations[i][0][swapIdx2];
					}
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
					setRandomHeights(animations[i][0]);
					setSetTimeouts([]);
					setPaused(true);
					setSwapOrder([]);
				}
			});
		}

		// // when sorted is clicked, set sorting function to handlePause
		// pass handlePause to pause button
		// in handlePause, clear all setTimeouts, then change swapOrderArray to begin at paused index
		// when sorted is clicked again, call handleSort with the new swapOrderArray
		// keep original swapOrderArray for forward and backward functionality
		// when forward or backward is called, call handleSort only on one index of swapOrderArray with 0 as speed
		console.log("bubbleSort 1:", timeouts);
		for (let i = 0; i < animations.length; i++) {
			timeouts.push(setTimeout(callbacks[i], i * speed));
		}
		console.log("bubbleSort 2:", timeouts);
	};

	const handleStep = (indexPaused, speed = 0) => {
		// sortingFunction(
		// 	sortingConfig,
		// 	swapOrder.slice(indexPaused, indexPaused + 1),
		// 	speed
		// );
		// setSwapOrder();
	};

	const handleSelectionSort = (animations, numOfBars, speed, timeouts) => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let bars = barsContainer.current.children;
		let callbacks = [];

		for (let i = 0; i < animations.length; i++) {
			let state = animations[i][3];
			let swapIdx1 = animations[i][1];
			let swapIdx2 = animations[i][2];

			callbacks.push(() => {
				setIndexPaused(i);
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
						animations[i][0][swapIdx1] + "px";
					bars[swapIdx2].style.height =
						animations[i][0][swapIdx2] + "px";
					if (numOfBars <= 20) {
						bars[swapIdx1].children[0].innerHTML =
							animations[i][0][swapIdx1];
						bars[swapIdx2].children[0].innerHTML =
							animations[i][0][swapIdx2];
					}
				} else if (state === "SWAPPING-2") {
					bars[swapIdx1].style.backgroundColor = COLOR_SORTED;
					bars[swapIdx2].style.backgroundColor = COLOR_DEFAULT;
				} else if (state === "NO-SWAP") {
					bars[swapIdx1].style.backgroundColor = COLOR_SORTED;
				} else if (state === "ALL-SORTED") {
					barsContainer.current.classList.add("sorted");
					setChangeToDefault(false);
					setIsSorting(false);
					setRandomHeights(animations[i][0]);
					setSetTimeouts([]);
					setPaused(true);
					setSwapOrder([]);
				}
			});
		}

		for (let i = 0; i < animations.length; i++) {
			timeouts.push(setTimeout(callbacks[i], i * speed));
		}
	};

	const handleInsertionSort = (animations, numOfBars, speed, timeouts) => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let bars = barsContainer.current.children;
		let callbacks = [];

		for (let i = 0; i < animations.length; i++) {
			let state = animations[i][3];
			let swapIdx1 = animations[i][1];
			let swapIdx2 = animations[i][2];

			callbacks.push(() => {
				setIndexPaused(i);
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
						animations[i][0][swapIdx1] + "px";
					bars[swapIdx2].style.height =
						animations[i][0][swapIdx2] + "px";
					if (numOfBars <= 20) {
						bars[swapIdx1].children[0].innerHTML =
							animations[i][0][swapIdx1];
						bars[swapIdx2].children[0].innerHTML =
							animations[i][0][swapIdx2];
					}
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
					setRandomHeights(animations[i][0]);
					setSetTimeouts([]);
					setPaused(true);
					setSwapOrder([]);
				}
			});
		}

		for (let i = 0; i < animations.length; i++) {
			timeouts.push(setTimeout(callbacks[i], i * speed));
		}
	};

	const handleMergeSort = (animations, numOfBars, speed, timeouts) => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let bars = barsContainer.current.children;
		let prevColor1 = COLOR_DEFAULT;
		let prevColor2 = COLOR_DEFAULT;
		let count = getRandomNum(0, RANDOM_COLORS.length - 1);
		let color = RANDOM_COLORS[count];
		let callbacks = [];

		for (let i = 0; i < animations.length; i++) {
			let state = animations[i][3];
			let swapIdx1 = animations[i][1];
			let swapIdx2 = animations[i][2];

			// eslint-disable-next-line no-loop-func
			callbacks.push(() => {
				setIndexPaused(i);
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
						bars[j].style.height = animations[i][0][j] + "px";
						if (numOfBars <= 20) {
							bars[j].children[0].innerHTML = animations[i][0][j];
						}
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
					setRandomHeights(animations[i][0]);
					setSetTimeouts([]);
					setPaused(true);
					setSwapOrder([]);
				}
			});
		}

		for (let i = 0; i < animations.length; i++) {
			timeouts.push(setTimeout(callbacks[i], i * speed));
		}
	};

	const handleQuickSort = (animations, numOfBars, speed, timeouts) => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let bars = barsContainer.current.children;
		let callbacks = [];

		for (let i = 0; i < animations.length; i++) {
			let state = animations[i][3];
			let swapIdx1 = animations[i][1];
			let swapIdx2 = animations[i][2];

			callbacks.push(() => {
				setIndexPaused(i);
				if (state === "GET-PIVOT") {
					bars[swapIdx1].style.backgroundColor = COLOR_SWAP;
				} else if (state === "COMPARE") {
					bars[swapIdx1].style.backgroundColor = COLOR_COMPARING;
				} else if (state === "REVERT") {
					bars[swapIdx1].style.backgroundColor = COLOR_GREATER;
				} else if (state === "SWAP-1") {
					// bars[swapIdx1].style.backgroundColor = COLOR_SWAP_LESSER;
					bars[swapIdx2].style.backgroundColor = COLOR_SWAP_LESSER;
				} else if (state === "SAME-INDEX") {
					bars[swapIdx1].style.backgroundColor = COLOR_LESSER;
				} else if (state === "SWAP-2") {
					bars[swapIdx1].style.backgroundColor = COLOR_SWAP_LESSER;
				} else if (state === "SWAP-3") {
					bars[swapIdx1].style.height =
						animations[i][0][swapIdx1] + "px";
					bars[swapIdx2].style.height =
						animations[i][0][swapIdx2] + "px";
					if (numOfBars <= 20) {
						bars[swapIdx1].children[0].innerHTML =
							animations[i][0][swapIdx1];
						bars[swapIdx2].children[0].innerHTML =
							animations[i][0][swapIdx2];
					}
				} else if (state === "SWAP-4") {
					bars[swapIdx1].style.backgroundColor = COLOR_LESSER;
					bars[swapIdx2].style.backgroundColor = COLOR_GREATER;
				} else if (state === "SWAP-PIVOT-1") {
					bars[swapIdx2].style.backgroundColor = COLOR_SWAP;
				} else if (state === "SWAP-PIVOT-2") {
					bars[swapIdx1].style.height =
						animations[i][0][swapIdx1] + "px";
					bars[swapIdx2].style.height =
						animations[i][0][swapIdx2] + "px";
					if (numOfBars <= 20) {
						bars[swapIdx1].children[0].innerHTML =
							animations[i][0][swapIdx1];
						bars[swapIdx2].children[0].innerHTML =
							animations[i][0][swapIdx2];
					}
				} else if (state === "SWAP-PIVOT-3") {
					bars[swapIdx1].style.backgroundColor = COLOR_LESSER;
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
					setRandomHeights(animations[i][0]);
					setSetTimeouts([]);
					setPaused(true);
					setSwapOrder([]);
				}
			});
		}

		for (let i = 0; i < animations.length; i++) {
			timeouts.push(setTimeout(callbacks[i], i * speed));
		}
	};

	const handleChangeSortingFunction = (sort) => {
		switch (sort) {
			case "Bubble Sort":
				setSortingFunction(() => handleBubbleSort);
				setSortingConfig({
					implementation: bubbleSort,
					args: [],
				});
				setLegend(bubbleSortLegend);
				break;
			case "Selection Sort":
				setSortingFunction(() => handleSelectionSort);
				setSortingConfig({
					implementation: selectionSort,
					args: [],
				});
				setLegend(selectionSortLegend);
				break;
			case "Insertion Sort":
				setSortingFunction(() => handleInsertionSort);
				setSortingConfig({
					implementation: insertionSort,
					args: [],
				});
				setLegend(insertionSortLegend);
				break;
			case "Merge Sort":
				setSortingFunction(() => handleMergeSort);
				setSortingConfig({
					implementation: getMergeSortRecursiveSwapOrder,
					args: [],
				});
				setLegend(mergeSortLegend);
				break;
			case "Quick Sort":
				setSortingFunction(() => handleQuickSort);
				setSortingConfig({
					implementation: getQuickSortSwapOrder,
					args: [],
				});
				setLegend(quickSortLegend);
				break;
			default:
				break;
		}
	};

	// const handleShellSort = () => {};

	// const handleHeapSort = () => {};

	// const handleRadixSort = () => {};

	const handleTestAlgorithms = () => {
		/* CHECKS IF DOM HEIGHTS MATCH SORTED RANDOM HEIGHTS*/
		// const sortedRandomHeights = [...randomHeights].sort((a, b) => a - b);
		// const barsDOM = document.getElementsByClassName("bar");
		// for (let i = 0; i < barsDOM.length; i++) {
		// 	console.log(
		// 		barsDOM[i].style.height === sortedRandomHeights[i] + "px"
		// 	);
		// }
		console.log(sortingFunction);
		console.log(sortingConfig);
	};

	return (
		<div className={classes.SortingVisualizer}>
			<div className={classes.Bars}>
				<Bars
					ref={barsContainer}
					heights={randomHeights}
					speed={sortingSpeed}
					statuses={legend}
					pause={handlePause}
					swapOrder={swapOrder}
					paused={paused}
					setTimeouts={setTimeouts}
					indexPaused={indexPaused}
					stepped={handleStep}
					showHeights={showHeights}
					sortConfig={sortingConfig}
					disableControls={disableControls}
					isSorting={isSorting}
					changedSortingFunction={handleChangeSortingFunction}
					generateNewArray={handleGenerateNewArray}
					sort={
						// sortingFunction
						// 	? sortingFunction
						// 	: () =>
						// 			handleMergeSort(
						// 				{
						// 					implementation: getMergeSortRecursiveSwapOrder,
						// 				},
						// 				randomHeights,
						// 				sortingSpeed
						// 			)
						handleSort
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
			<Button clicked={handleTestAlgorithms}>Test</Button>
		</div>
	);
};

export default SortingVisualizer;
