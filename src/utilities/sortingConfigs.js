import { bubbleSort } from "../sortingAlgorithms/bubbleSort";
import { selectionSort } from "../sortingAlgorithms/selectionSort";
import { insertionSort } from "../sortingAlgorithms/insertionSort";
import {
	mergeSortIterative,
	getMergeSortRecursiveSwapOrder,
} from "../sortingAlgorithms/mergeSort";
import { getQuickSortSwapOrder } from "../sortingAlgorithms/quickSort";

import Manipulations from "./sortingManipulations";

const bubbleSortConfig = {
	implementation: bubbleSort,
	args: [],
	label: "Iterative",
	manipulation: Manipulations.bubbleSortManipulations,
};

export const bubbleSortConfigs = [bubbleSortConfig];

const selectionSortConfig = {
	implementation: selectionSort,
	args: [],
	label: "Iterative",
	manipulation: Manipulations.selectionSortManipulations,
};

export const selectionSortConfigs = [selectionSortConfig];

const insertionSortConfig = {
	implementation: insertionSort,
	args: [],
	label: "Iterative",
	manipulation: Manipulations.insertionSortManipulations,
};

export const insertionSortConfigs = [insertionSortConfig];

const mergeSortRecursiveConfig = {
	implementation: getMergeSortRecursiveSwapOrder,
	args: [],
	label: "Recursive",
	manipulation: Manipulations.mergeSortManipulations,
};

const mergeSortIterativeConfig = {
	implementation: mergeSortIterative,
	args: [],
	label: "Iterative",
	manipulation: Manipulations.mergeSortManipulations,
};

export const mergeSortConfigs = [
	mergeSortRecursiveConfig,
	mergeSortIterativeConfig,
];

const quickSortIterativeConfig = {
	implementation: getQuickSortSwapOrder,
	args: [],
	label: "Recursive",
	manipulation: Manipulations.quickSortManipulations,
};

export const quickSortConfigs = [quickSortIterativeConfig];

export default {
	bubbleSortConfigs,
	selectionSortConfigs,
	insertionSortConfigs,
	mergeSortConfigs,
	quickSortConfigs,
};
