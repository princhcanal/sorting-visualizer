import { bubbleSort } from "./sortingAlgorithms/bubbleSort";
import { selectionSort } from "./sortingAlgorithms/selectionSort";
import { insertionSort } from "./sortingAlgorithms/insertionSort";
import {
	mergeSortIterative,
	mergeSortRecursive,
} from "./sortingAlgorithms/mergeSort";
import { quickSortLomuto } from "./sortingAlgorithms/quickSort";
import { heapSort } from "./sortingAlgorithms/heapSort";
import { shellSort } from "./sortingAlgorithms/shellSort";
import { radixSort } from "./sortingAlgorithms/radixSort";

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
	implementation: mergeSortRecursive,
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

const quickSortLomutoConfig = {
	implementation: quickSortLomuto,
	args: [],
	label: "Recursive",
	manipulation: Manipulations.quickSortManipulations,
};

export const quickSortConfigs = [quickSortLomutoConfig];

const heapSortConfig = {
	implementation: heapSort,
	args: [],
	label: "Recursive",
	manipulation: Manipulations.heapSortManipulations,
};

export const heapSortConfigs = [heapSortConfig];

const shellSortConfig = {
	implementation: shellSort,
	args: [],
	label: "Iterative",
	manipulation: Manipulations.shellSortManipulations,
};

export const shellSortConfigs = [shellSortConfig];

const radixSortConfig = {
	implementation: radixSort,
	args: [],
	label: "Iterative",
	manipulation: Manipulations.radixSortManipulations,
};

export const radixSortConfigs = [radixSortConfig];

export default {
	bubbleSortConfigs,
	selectionSortConfigs,
	insertionSortConfigs,
	mergeSortConfigs,
	quickSortConfigs,
	heapSortConfigs,
	shellSortConfigs,
	radixSortConfigs,
};
