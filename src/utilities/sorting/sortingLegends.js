import Colors from "../colors";

export const bubbleSortLegend = [
	{ color: Colors.COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: Colors.COLOR_COMPARING, desc: "Comparing" },
	{ color: Colors.COLOR_SWAP, desc: "Swap Values" },
	{ color: Colors.COLOR_SORTED, desc: "Sorted" },
];
export const selectionSortLegend = [
	{ color: Colors.COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: Colors.COLOR_COMPARING, desc: "Comparing" },
	{ color: Colors.COLOR_PIVOT, desc: "Current Smallest" },
	{ color: Colors.COLOR_SWAP, desc: "Swap Values" },
	{ color: Colors.COLOR_SORTED, desc: "Sorted" },
];

export const insertionSortLegend = [
	{ color: Colors.COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: Colors.COLOR_COMPARING, desc: "Comparing" },
	{ color: Colors.COLOR_SWAP, desc: "Swap Values" },
	{ color: Colors.COLOR_LESSER, desc: "Correct Position" },
	{ color: Colors.COLOR_SORTED, desc: "Sorted" },
];

export const mergeSortLegend = [
	{ color: Colors.COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: Colors.COLOR_SUBARRAY_1, desc: "Subarray 1" },
	{ color: Colors.COLOR_SUBARRAY_2, desc: "Subarray 2" },
	{ color: Colors.COLOR_COMPARING, desc: "Comparing" },
	{ color: Colors.COLOR_SWAP, desc: "Swap Values" },
	{ color: "", desc: "Sorted in Subarray" },
	{ color: Colors.COLOR_SORTED, desc: "Sorted" },
];

export const quickSortLegend = [
	{ color: Colors.COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: Colors.COLOR_PIVOT, desc: "Pivot" },
	{ color: Colors.COLOR_PIVOT_INDEX, desc: "Pivot Index" },
	{ color: Colors.COLOR_COMPARING, desc: "Compare with Pivot" },
	{ color: Colors.COLOR_LESSER, desc: "Less than Pivot" },
	{ color: Colors.COLOR_GREATER, desc: "Greater than Pivot" },
	{ color: Colors.COLOR_SWAP, desc: "Swap Values" },
	{ color: Colors.COLOR_SORTED, desc: "Sorted" },
];

export const heapSortLegend = [
	{ color: Colors.COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: "", desc: "Heap Levels" },
	{ color: Colors.COLOR_PIVOT, desc: "Root of Sub-Heap" },
	{ color: Colors.COLOR_PIVOT_INDEX, desc: "Children of Sub-Root" },
	{ color: Colors.COLOR_GREATER, desc: "Largest in Sub-Heap" },
	{ color: Colors.COLOR_SWAP, desc: "Swap Values" },
	{ color: Colors.COLOR_SORTED, desc: "Sorted" },
];

export const shellSortLegend = [
	{ color: Colors.COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: "", desc: "Gap" },
	{ color: Colors.COLOR_COMPARING, desc: "Comparing" },
	{ color: Colors.COLOR_SWAP, desc: "Swap Values" },
	{ color: Colors.COLOR_SORTED, desc: "Sorted" },
];

export const radixSortLegend = [
	{ color: Colors.COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: Colors.COLOR_COMPARING, desc: "Checking Ones Place" },
	{ color: Colors.COLOR_PIVOT, desc: "Checking Tens Place" },
	{ color: Colors.COLOR_LESSER, desc: "Checking Hundreds Place" },
	{ color: "", desc: "Digit Color" },
	{ color: Colors.COLOR_SWAP, desc: "Place Element to Correct Position" },
	{ color: Colors.COLOR_SORTED, desc: "Sorted" },
];

export default {
	bubbleSortLegend,
	selectionSortLegend,
	insertionSortLegend,
	mergeSortLegend,
	quickSortLegend,
	heapSortLegend,
	shellSortLegend,
	radixSortLegend,
};
