import React, { useRef, useImperativeHandle, forwardRef } from "react";

import Bar from "./Bar/Bar";
import Button from "../../../components/UI/Button/Button";

// TODO: create custom select, change width of bars as size decreases, put numbers on bars
let Bars = (props, ref) => {
	const barsContainer = useRef();
	useImperativeHandle(ref, () => ({
		children: barsContainer.current.children,
		classList: barsContainer.current.classList,
	}));

	let bars;
	if (props.heights) {
		bars = props.heights.map((randHeight, i) => {
			return <Bar key={i} height={randHeight}></Bar>;
		});
	}
	return (
		<>
			<select
				name="sorting-algorithms"
				id="algos"
				defaultValue={"MergeSort"}
				onChange={props.changedSortingFunction}
			>
				<option value="BubbleSort">Bubble Sort</option>
				<option value="SelectionSort">Selection Sort</option>
				<option value="InsertionSort">Insertion Sort</option>
				<option value="MergeSort">Merge Sort</option>
				<option value="QuickSort">Quick Sort</option>
				<option value="ShellSort" disabled>
					Shell Sort (Coming Soon)
				</option>
				<option value="HeapSort" disabled>
					Heap Sort (Coming Soon)
				</option>
				<option value="RadixSort" disabled>
					Radix Sort (Coming Soon)
				</option>
			</select>
			<div className="bars" ref={barsContainer}>
				{/* {bars && bars} */}
				{props.disableControls ? (
					<p>Please place valid inputs</p>
				) : (
					bars
				)}
			</div>
			<Button
				classNames="burgundy"
				clicked={props.generateNewArray}
				disabled={props.isSorting || props.disableControls}
			>
				New Array
			</Button>
			<Button
				clicked={() =>
					props.sort(props.sortConfig, props.heights, props.speed)
				}
				disabled={props.isSorting || props.disableControls}
			>
				Sort
			</Button>
		</>
	);
};

Bars = forwardRef(Bars);

export default Bars;
