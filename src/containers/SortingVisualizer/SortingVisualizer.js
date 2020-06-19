import React, { useState, useEffect, useRef } from "react";

import Bars from "./Bars/Bars";
import Controls from "./Controls/Controls";
import { getRandomNum } from "../../utilities/numbers";
import colors, { RANDOM_COLORS } from "../../utilities/colors";
import Legends from "../../utilities/legends";
import Configs from "../../utilities/sortingConfigs";
// import Button from "../../components/UI/Button/Button";

const MIN_HEIGHT = 25;
const MAX_HEIGHT = 300;
let SORTING_SPEED = 5;
const NUM_BARS = 100;

// TODO: shell sort
// TODO: radix sort
// TODO: heap sort
// TODO: quick sort variations
const SortingVisualizer = (props) => {
	const [randomHeights, setRandomHeights] = useState();
	const [isSorting, setIsSorting] = useState(false);
	const [disableControls, setDisableControls] = useState(false);
	const [numBars, setNumBars] = useState(NUM_BARS);
	const [sortingSpeed, setSortingSpeed] = useState(SORTING_SPEED);
	const [prevSortingSpeed, setPrevSortingSpeed] = useState(SORTING_SPEED);
	const [changeToDefault, setChangeToDefault] = useState(false);
	const [sortingConfig, setSortingConfig] = useState();
	const [sortingConfigs, setSortingConfigs] = useState([]);
	const [showHeights, setShowHeights] = useState(false);
	const [legend, setLegend] = useState([{}]);
	const [swapOrder, setSwapOrder] = useState([]);
	const [setTimeouts, setSetTimeouts] = useState([]);
	const [paused, setPaused] = useState(true);
	const [allStates, setAllStates] = useState([]);

	const barsContainer = useRef();
	const errorMessage = useRef();
	const indexPaused = useRef(0);
	const range = useRef();

	useEffect(() => {
		handleChangeSortingFunction("Merge Sort");
		handleShowError(NUM_BARS);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (numBars <= 20) setShowHeights(true);
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
		if (!paused) {
			let pausedIdxOriginal = indexPaused.current;
			if (pausedIdxOriginal < 0) {
				pausedIdxOriginal = 0;
			}

			if (allStates.length === 0) {
				handleRevertState(randomHeights);
				handleAnimations(
					swapOrder.slice(pausedIdxOriginal),
					randomHeights,
					sortingSpeed,
					setTimeouts,
					allStates
				);
			} else {
				handleAnimateStates(
					pausedIdxOriginal,
					allStates.length,
					sortingSpeed,
					setTimeouts,
					randomHeights,
					allStates
				);
			}
		} else if (paused && prevSortingSpeed !== sortingSpeed && isSorting) {
			handleSort(sortingConfig, randomHeights);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paused]);

	const handleGenerateNewArray = () => {
		const newRandomHeights = [];
		for (let i = 0; i < numBars; i++) {
			newRandomHeights.push(getRandomNum(MIN_HEIGHT, MAX_HEIGHT));
			// newRandomHeights.push(MAX_HEIGHT);
		}
		handlePause(setTimeouts);
		setChangeToDefault(true);
		setRandomHeights(newRandomHeights);
		setSetTimeouts([]);
		setSwapOrder([]);
		setAllStates([]);
		indexPaused.current = 0;
		indexPaused.current = -1;
		range.current.value = 0;
	};

	const handleColorNewBars = () => {
		if (changeToDefault && !disableControls) {
			let bars = barsContainer.current.children;
			for (let i = 0; i < numBars; i++) {
				bars[i].style.backgroundColor = colors.COLOR_DEFAULT;
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
			if (isNaN(value) || value === "") {
				errorMessage.current.children[0].innerHTML +=
					"INPUT NOT A NUMBER";
			} else if (value < 5) {
				errorMessage.current.children[0].innerHTML +=
					"SIZE LESS THAN MINIMUM";
			} else if (value > 100) {
				errorMessage.current.children[0].innerHTML +=
					"SIZE MORE THAN MAXIMUM";
			}
			errorMessage.current.classList.add("show-error");
			setDisableControls(true);
		}
		handlePause(setTimeouts);
		setChangeToDefault(true);
		setRandomHeights(randomHeights);
		setSetTimeouts([]);
		setSwapOrder([]);
		setAllStates([]);
		indexPaused.current = 0;
		indexPaused.current = -1;
		range.current.value = 0;
	};

	const handleChangeSortingSpeed = (event) => {
		setPrevSortingSpeed(Number(sortingSpeed));
		setSortingSpeed(Number(event.target.value));
		if (isSorting) {
			handlePause(setTimeouts);
			setIsSorting(true);
		}
	};

	const handlePause = (timeouts) => {
		let pausedIdxOriginal = indexPaused.current;
		for (let i = pausedIdxOriginal; i < timeouts.length; i++) {
			clearTimeout(timeouts[i]);
		}
		setIsSorting(false);
		setPaused(true);
	};

	const handleStep = (timeouts, direction) => {
		handlePause(timeouts);
		let pausedIdx = indexPaused.current;
		let idx1, idx2;
		if (
			direction === "+" &&
			pausedIdx < allStates.length - 1 &&
			pausedIdx >= 0
		) {
			idx1 = pausedIdx + 1;
			idx2 = pausedIdx + 2;
		} else if (direction === "-" && pausedIdx > 0) {
			if (pausedIdx === allStates.length - 1)
				barsContainer.current.classList.remove("sorted");
			idx1 = pausedIdx - 1;
			idx2 = pausedIdx;
			indexPaused.current = pausedIdx - 1;
			range.current.value = pausedIdx - 1;
		} else {
			barsContainer.current.playControls.classList.remove("shake");
			range.current.classList.remove("shake");
			setTimeout(() => {
				barsContainer.current.playControls.classList.add("shake");
				range.current.classList.add("shake");
			}, 10);
			return;
		}
		handleAnimateStates(
			idx1,
			idx2,
			0,
			timeouts,
			randomHeights,
			allStates,
			direction
		);
	};

	const handleSliderChange = (eventTarget) => {
		if (allStates.length === 0) return;
		barsContainer.current.classList.remove("sorted");
		if (isSorting) {
			handlePause(setTimeouts);
			indexPaused.current = Number(eventTarget.value);
			let pausedIdx = indexPaused.current;
			setIsSorting(true);
			handleAnimateStates(
				pausedIdx,
				allStates.length,
				sortingSpeed,
				setTimeouts,
				randomHeights,
				allStates
			);
			setPaused(false);
		} else {
			indexPaused.current = Number(eventTarget.value);
			let pausedIdx = indexPaused.current;
			handleAnimateStates(
				pausedIdx,
				pausedIdx + 1,
				0,
				setTimeouts,
				randomHeights,
				allStates
			);
		}
	};

	const handleSort = (config, heights) => {
		let pausedIdx = indexPaused.current;
		if (pausedIdx >= allStates.length - 1 && pausedIdx !== -1) {
			setRandomHeights(heights.sort((a, b) => a - b));
			setSetTimeouts([]);
			setAllStates([]);
			indexPaused.current = 0;
			indexPaused.current = -1;
			range.current.value = 0;
			let swapOrderArray = config.implementation(
				[...heights],
				...config.args
			);
			setSwapOrder(swapOrderArray);
			setPaused(false);
			return;
		}
		setPaused(false);
		if (!sortingConfig) {
			handleChangeSortingFunction("Merge Sort");
		}
		if (swapOrder.length === 0) {
			let swapOrderArray = config.implementation(
				[...heights],
				...config.args
			);
			setSwapOrder(swapOrderArray);
		}
	};

	const handleStoreAllStates = (i, states) => {
		let bars = barsContainer.current.children;
		for (let j = 0; j < bars.length; j++) {
			states[i].push({
				height: bars[j].style.height,
				color: bars[j].style.backgroundColor,
			});
		}
	};

	const handleRevertState = (heights) => {
		let bars = barsContainer.current.children;
		for (let j = 0; j < bars.length; j++) {
			bars[j].style.height = heights[j] + "px";
			bars[j].style.backgroundColor = colors.COLOR_DEFAULT;
			if (bars.length <= 20) bars[j].children[0].innerHTML = heights[j];
		}
	};

	const handleAnimateStates = (
		start,
		end,
		speed,
		timeouts,
		heights,
		states,
		direction = "+"
	) => {
		if (start !== end - 1) setIsSorting(true);
		let bars = barsContainer.current.children;
		let speedMultiplier = 0;
		for (let i = start; i < end; i++) {
			timeouts.push(
				setTimeout(() => {
					if (direction === "+") {
						range.current.value = ++indexPaused.current;
					}
					for (let j = 0; j < bars.length; j++) {
						let height = states[i][j].height;
						bars[j].style.height = height;
						bars[j].style.backgroundColor = states[i][j].color;
						if (bars.length <= 20)
							bars[j].children[0].innerHTML = height.substring(
								0,
								height.indexOf("px")
							);
					}
					if (i === states.length - 1) {
						handleAllSorted(heights);
					}
				}, speed * speedMultiplier++)
			);
		}
	};

	const handleAllSorted = (heights) => {
		barsContainer.current.classList.add("sorted");
		setChangeToDefault(false);
		setIsSorting(false);
		// setRandomHeights(animations[i][0]);
		// // setRandomHeights(heights.sort((a, b) => a - b));
		// setSetTimeouts([]);
		setPaused(true);
		// // setAllStates([]);
		// indexPaused.current.innerHTML = -1;
	};

	const handleAnimations = (animations, heights, speed, timeouts, states) => {
		setIsSorting(true);
		barsContainer.current.classList.remove("sorted");
		let bars = barsContainer.current.children;
		let prevColor1 = colors.COLOR_DEFAULT;
		let prevColor2 = colors.COLOR_DEFAULT;
		let count = getRandomNum(0, RANDOM_COLORS.length - 1);
		let color = RANDOM_COLORS[count];
		let otherArgs = [prevColor1, prevColor2, count, color, {}];

		for (let i = 0; i < animations.length; i++) {
			states.push([]);
			let state = animations[i][2];
			let idx1 = animations[i][0];
			let idx2 = animations[i][1];

			sortingConfig.manipulation(
				bars,
				animations,
				heights,
				barsContainer,
				i,
				idx1,
				idx2,
				state,
				otherArgs
			);
			handleStoreAllStates(i, states);
		}
		handleRevertState(heights);
		states.unshift([]);
		handleStoreAllStates(0, states);

		handleAnimateStates(0, states.length, speed, timeouts, heights, states);
	};

	const handleChangeSortingFunction = (sort) => {
		switch (sort) {
			case "Bubble Sort":
				setSortingConfig(Configs.bubbleSortConfigs[0]);
				setSortingConfigs(Configs.bubbleSortConfigs);
				setLegend(Legends.bubbleSortLegend);
				break;
			case "Selection Sort":
				setSortingConfig(Configs.selectionSortConfigs[0]);
				setSortingConfigs(Configs.selectionSortConfigs);
				setLegend(Legends.selectionSortLegend);
				break;
			case "Insertion Sort":
				setSortingConfig(Configs.insertionSortConfigs[0]);
				setSortingConfigs(Configs.insertionSortConfigs);
				setLegend(Legends.insertionSortLegend);
				break;
			case "Merge Sort":
				setSortingConfig(Configs.mergeSortConfigs[0]);
				setSortingConfigs(Configs.mergeSortConfigs);
				setLegend(Legends.mergeSortLegend);
				break;
			case "Quick Sort":
				setSortingConfig(Configs.quickSortConfigs[0]);
				setSortingConfigs(Configs.quickSortConfigs);
				setLegend(Legends.quickSortLegend);
				break;
			case "Heap Sort":
				setSortingConfig(Configs.heapSortConfigs[0]);
				setSortingConfigs(Configs.heapSortConfigs);
				setLegend(Legends.heapSortLegend);
				break;
			default:
				break;
		}

		for (let i = 0; i < setTimeouts.length; i++) {
			clearTimeout(setTimeouts[i]);
		}

		handleGenerateNewArray();
		setIsSorting(false);
		setSetTimeouts([]);
		setPaused(true);
		setAllStates([]);
		indexPaused.current = 0;
		indexPaused.current = -1;
		range.current.value = 0;
	};

	const handleChangeSortingConfig = (config) => {
		setSortingConfig((prevConfig) => {
			if (prevConfig !== config) {
				handlePause(setTimeouts);
				handleGenerateNewArray();
				setIsSorting(false);
				setSetTimeouts([]);
				setPaused(true);
				setAllStates([]);
				indexPaused.current = -1;
				range.current.value = 0;
			}
			return config;
		});
	};

	// const handleTestAlgorithms = () => {
	// 	/* CHECKS IF DOM HEIGHTS MATCH SORTED RANDOM HEIGHTS*/
	// 	// const sortedRandomHeights = [...randomHeights].sort((a, b) => a - b);
	// 	// const barsDOM = document.getElementsByClassName("bar");
	// 	// for (let i = 0; i < barsDOM.length; i++) {
	// 	// 	console.log(
	// 	// 		barsDOM[i].style.height === sortedRandomHeights[i] + "px"
	// 	// 	);
	// 	// }
	// 	// console.log("Sorting Function:", sortingFunction);
	// 	// console.log("Sorting Config:", sortingConfig);
	// };

	return (
		<div className="SortingVisualizer">
			<div className="Bars">
				<Bars
					ref={barsContainer}
					heights={randomHeights}
					statuses={legend}
					pause={handlePause}
					paused={paused}
					sortConfig={sortingConfig}
					setTimeouts={setTimeouts}
					states={allStates}
					stepped={handleStep}
					showHeights={showHeights}
					disableControls={disableControls}
					isSorting={isSorting}
					changedSortingFunction={handleChangeSortingFunction}
					generateNewArray={handleGenerateNewArray}
					sort={handleSort}
					sliderChanged={handleSliderChange}
					index={indexPaused.current}
				></Bars>
				<input
					type="range"
					ref={range}
					className="play-controls-range"
					min={0}
					max={allStates.length - 1}
					step={1}
					id="playRange"
					name="playRange"
					onChange={(e) => handleSliderChange(e.target)}
					disabled={disableControls}
				/>
			</div>
			<div className="Controls">
				<Controls
					ref={errorMessage}
					size={numBars}
					speed={sortingSpeed}
					configs={sortingConfigs}
					changedArraySize={handleChangeArraySize}
					changedSortingSpeed={handleChangeSortingSpeed}
					changedSortingConfig={handleChangeSortingConfig}
				/>
			</div>
			{/* <Button clicked={handleTestAlgorithms}>Test</Button> */}
		</div>
	);
};

export default SortingVisualizer;
