import { bubbleSort } from "../sortingAlgorithms/bubbleSort";
import { selectionSort } from "../sortingAlgorithms/selectionSort";
import { insertionSort } from "../sortingAlgorithms/insertionSort";
import {
	mergeSortIterative,
	getMergeSortRecursiveSwapOrder,
} from "../sortingAlgorithms/mergeSort";
import { getQuickSortSwapOrder } from "../sortingAlgorithms/quickSort";

const bubbleSortConfig = {
	implementation: bubbleSort,
	args: [],
	label: "Iterative",
};

export const bubbleSortConfigs = [bubbleSortConfig];

const selectionSortConfig = {
	implementation: selectionSort,
	args: [],
	label: "Iterative",
};

export const selectionSortConfigs = [selectionSortConfig];

const insertionSortConfig = {
	implementation: insertionSort,
	args: [],
	label: "Iterative",
};

export const insertionSortConfigs = [insertionSortConfig];

const mergeSortRecursiveConfig = {
	implementation: getMergeSortRecursiveSwapOrder,
	args: [],
	label: "Recursive",
};

const mergeSortIterativeConfig = {
	implementation: mergeSortIterative,
	args: [],
	label: "Iterative",
};

export const mergeSortConfigs = [
	mergeSortRecursiveConfig,
	mergeSortIterativeConfig,
];

const quickSortIterativeConfig = {
	implementation: getQuickSortSwapOrder,
	args: [],
	label: "Recursive",
};

export const quickSortConfigs = [quickSortIterativeConfig];
