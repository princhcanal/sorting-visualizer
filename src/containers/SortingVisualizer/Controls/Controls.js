import React from "react";
import Card from "../../../components/UI/Card/Card";

import classes from "./Controls.module.css";
import Button from "../../../components/UI/Button/Button";

let Controls = (props, ref) => {
	return (
		<div className={classes.Controls}>
			<Card>
				<h2>Choose a Sorting Algorithm</h2>
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
			</Card>
			<Card>
				<h2>Controls</h2>
				<Button
					clicked={props.generateNewArray}
					disabled={props.disableControls}
				>
					Generate New Random Array
				</Button>
				<Button
					clicked={() =>
						props.sort(props.sortConfig, props.heights, props.speed)
					}
					disabled={props.disableControls}
				>
					Sort
				</Button>
				<div className="input-group">
					<label htmlFor="arrSize">Change Array Size</label>
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
					<p>{props.size}</p>
				</div>
				<div className="input-group">
					<label htmlFor="sortSpeed">Change Sorting Speed</label>
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
					<p>{props.speed}</p>
				</div>
			</Card>
			<Card>
				<h2>Options</h2>
			</Card>
		</div>
	);
};

export default Controls;
