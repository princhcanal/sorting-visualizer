import {
	COLOR_DEFAULT,
	COLOR_COMPARING,
	COLOR_SWAP,
	COLOR_SORTED,
	COLOR_GREATER,
	COLOR_LESSER,
	COLOR_SWAP_LESSER,
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
	{ color: COLOR_SWAP, desc: "Swap Values" },
	{ color: COLOR_SORTED, desc: "Sorted" },
];

export const insertionSortLegend = [
	{ color: COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: COLOR_COMPARING, desc: "Comparing" },
	{ color: COLOR_SWAP, desc: "Swap Values" },
	{ color: COLOR_SORTED, desc: "Sorted (Temporary)" },
];

export const mergeSortLegend = [
	{ color: COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: COLOR_COMPARING, desc: "Comparing" },
	{ color: COLOR_SWAP, desc: "Swap Values" },
	{ color: COLOR_SORTED, desc: "Sorted" },
	{ color: "", desc: "Other Colors: Sorted in Subarray" },
];

export const quickSortLegend = [
	{ color: COLOR_DEFAULT, desc: "Not Sorted" },
	{ color: COLOR_COMPARING, desc: "Compare with Pivot" },
	{ color: COLOR_LESSER, desc: "Less than Pivot" },
	{ color: COLOR_GREATER, desc: "Greater than Pivot" },
	{ color: COLOR_SWAP_LESSER, desc: "Swap to Pivot Index" },
	{ color: COLOR_SWAP, desc: "Swap Values" },
	{ color: COLOR_SORTED, desc: "Sorted" },
];
