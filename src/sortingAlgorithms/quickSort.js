const { getRandomArray } = require("../utilities/numbers");

export function getQuickSortSwapOrder(
	arr,
	left = 0,
	right = arr.length - 1,
	swapOrderArray = []
) {
	quickSort(arr, left, right, swapOrderArray);
	// swapOrderArray.push([[...arr], left, right, "ALL-SORTED"]);
	swapOrderArray.push([left, right, "ALL-SORTED"]);
	return swapOrderArray;
}

function quickSort(arr, left = 0, right = arr.length - 1, swapOrderArray) {
	if (left < right) {
		let pivotIndex = pivotLomuto(arr, left, right, swapOrderArray);
		quickSort(arr, left, pivotIndex - 1, swapOrderArray);
		quickSort(arr, pivotIndex + 1, right, swapOrderArray);
	} else if (left === right) {
		// swapOrderArray.push([[...arr], left, right, "SORTED-1"]); // red left
		swapOrderArray.push([left, right, "SORTED-1"]); // red left
		// swapOrderArray.push([[...arr], left, right, "SORTED-2"]); // green left
		swapOrderArray.push([left, right, "SORTED-2"]); // green left
	}
	return swapOrderArray;
}

function pivotLomuto(arr, start = 0, end = arr.length - 1, swapOrderArray) {
	let pivot = arr[start];
	let pivotIndex = start;

	// swapOrderArray.push([[...arr], start, end, "GET-PIVOT"]); // red start
	swapOrderArray.push([start, end, "GET-PIVOT"]); // red start

	for (let i = start + 1; i <= end; i++) {
		// swapOrderArray.push([[...arr], i, pivotIndex, "COMPARE"]); // yellow i
		swapOrderArray.push([i, pivotIndex, "COMPARE"]); // yellow i
		if (pivot > arr[i]) {
			pivotIndex++;
			if (pivotIndex !== i) {
				// swapOrderArray.push([[...arr], pivotIndex, i, "SWAP-1"]); // orange i
				swapOrderArray.push([pivotIndex, i, "SWAP-1"]); // orange i
				// swapOrderArray.push([[...arr], pivotIndex, i, "SWAP-2"]); // orange pivotIndex
				swapOrderArray.push([pivotIndex, i, "SWAP-2"]); // orange pivotIndex
				swap(arr, pivotIndex, i);
				// swapOrderArray.push([[...arr], pivotIndex, i, "SWAP-3"]); // swap
				swapOrderArray.push([pivotIndex, i, "SWAP-3"]); // swap
				// swapOrderArray.push([
				// 	[...arr],
				// 	[start, pivotIndex],
				// 	i,
				// 	"SWAP-4",
				// ]); // blue, white
				swapOrderArray.push([[start, pivotIndex], i, "SWAP-4"]); // blue, white
			} else {
				// swapOrderArray.push([[...arr], start, i, "SAME-INDEX-1"]); // blue pivotIndex
				swapOrderArray.push([start, i, "SAME-INDEX-1"]); // blue pivotIndex
				// swapOrderArray.push([[...arr], start, i, "SAME-INDEX-2"]); // blue pivotIndex
				swapOrderArray.push([start, i, "SAME-INDEX-2"]); // blue pivotIndex
			}
		} else {
			// swapOrderArray.push([[...arr], i, pivotIndex, "GREATER"]); // white i
			swapOrderArray.push([i, pivotIndex, "GREATER"]); // white i
		}
	}
	if (pivotIndex !== start) {
		// swapOrderArray.push([[...arr], start, pivotIndex, "SWAP-PIVOT-1"]); // red pivotIndex
		swapOrderArray.push([start, pivotIndex, "SWAP-PIVOT-1"]); // red pivotIndex
		swap(arr, start, pivotIndex);
		// swapOrderArray.push([[...arr], start, pivotIndex, "SWAP-PIVOT-2"]); // swap
		swapOrderArray.push([start, pivotIndex, "SWAP-PIVOT-2"]); // swap
		// swapOrderArray.push([[...arr], start, pivotIndex, "SWAP-PIVOT-3"]); // blue, green
		swapOrderArray.push([start, pivotIndex, "SWAP-PIVOT-3"]); // blue, green
	} else {
		// swapOrderArray.push([[...arr], start, pivotIndex, "NO-CHANGE"]); // green start
		swapOrderArray.push([start, pivotIndex, "NO-CHANGE"]); // green start
	}
	if (pivotIndex !== end) {
		// swapOrderArray.push([
		// 	[...arr],
		// 	[start, pivotIndex],
		// 	end + 1,
		// 	"REVERT-BOTH",
		// ]);
		swapOrderArray.push([[start, pivotIndex], end + 1, "REVERT-BOTH"]);
	} else {
		// swapOrderArray.push([[...arr], start, pivotIndex, "REVERT-LEFT"]);
		swapOrderArray.push([start, pivotIndex, "REVERT-LEFT"]);
	}
	return pivotIndex;
}

function quickSortHoare(arr, start, end, swapOrderArray) {
	if (start < end) {
		let pivotIndex = pivotHoare(arr, start, end, swapOrderArray);
		quickSortHoare(arr, start, pivotIndex, swapOrderArray);
		quickSortHoare(arr, pivotIndex + 1, end, swapOrderArray);
	} else {
	}
}

function pivotHoare(arr, start = 0, end = arr.length - 1, swapOrderArray) {
	let mid = Math.floor((start + end) / 2);
	let pivot = arr[mid];
	let i = start;
	let j = end;

	// swapOrderArray.push([[...arr], mid, mid, "GET-PIVOT"]);
	swapOrderArray.push([mid, mid, "GET-PIVOT"]);

	while (true) {
		while (arr[i] < pivot) {
			i++;
		}
		while (arr[j] > pivot) {
			j--;
		}
		if (i >= j) {
			return j;
		}
		swap(arr, i++, j--);
	}
}

function swap(arr, i, j) {
	[arr[i], arr[j]] = [arr[j], arr[i]];
}

let arr = getRandomArray();
// let sorted = [...arr].sort((a, b) => a - b);
quickSortHoare(arr, 0, arr.length - 1, []);
