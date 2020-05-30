import {
	COLOR_DEFAULT,
	COLOR_COMPARING,
	COLOR_SWAP,
	COLOR_SORTED,
	COLOR_PIVOT,
	COLOR_PIVOT_INDEX,
	COLOR_GREATER,
	COLOR_LESSER,
} from "./colors";

export const bubbleSortLegend = [
	{ color: COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: COLOR_COMPARING, desc: "Comparing" },
	{ color: COLOR_SWAP, desc: "Swap Values" },
	{ color: COLOR_SORTED, desc: "Sorted" },
];
export const selectionSortLegend = [
	{ color: COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: COLOR_COMPARING, desc: "Comparing" },
	{ color: COLOR_PIVOT, desc: "Current Smallest" },
	{ color: COLOR_SWAP, desc: "Swap Values" },
	{ color: COLOR_SORTED, desc: "Sorted" },
];

export const insertionSortLegend = [
	{ color: COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: COLOR_COMPARING, desc: "Comparing" },
	{ color: COLOR_SWAP, desc: "Swap Values" },
	{ color: COLOR_LESSER, desc: "Correct Position" },
	{ color: COLOR_SORTED, desc: "Sorted" },
];

export const mergeSortLegend = [
	{ color: COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: COLOR_COMPARING, desc: "Comparing" },
	{ color: COLOR_SWAP, desc: "Swap Values" },
	{ color: COLOR_SORTED, desc: "Sorted" },
	{ color: "", desc: "Sorted in Subarray" },
];

export const quickSortLegend = [
	{ color: COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: COLOR_PIVOT, desc: "Pivot" },
	{ color: COLOR_PIVOT_INDEX, desc: "Pivot Index" },
	{ color: COLOR_COMPARING, desc: "Compare with Pivot" },
	{ color: COLOR_LESSER, desc: "Less than Pivot" },
	{ color: COLOR_GREATER, desc: "Greater than Pivot" },
	// { color: COLOR_SWAP_LESSER, desc: "Swap to Pivot Index" },
	{ color: COLOR_SWAP, desc: "Swap Values" },
	{ color: COLOR_SORTED, desc: "Sorted" },
];
