const { getRandomArray } = require("../utilities/numbers");

export function insertionSort(arr) {
	let swapOrderArray = [];
	let prevSorted = -1;
	for (let i = 1; i < arr.length; i++) {
		let current = arr[i];
		// swapOrderArray.push([[...arr], prevSorted, i, "START"]);
		swapOrderArray.push([prevSorted, i, "START"]);
		for (var j = i - 1; j >= 0; j--) {
			if (arr[j] > current) {
				// swapOrderArray.push([[...arr], j, j + 1, "SWAP-1"]);
				swapOrderArray.push([j, j + 1, "SWAP-1"]);
				// swapOrderArray.push([[...arr], j, j + 1, "SWAP-2"]);
				swapOrderArray.push([j, j + 1, "SWAP-2"]);
				swap(arr, j, j + 1);
				// swapOrderArray.push([[...arr], j, j + 1, "SWAP-3"]);
				swapOrderArray.push([j, j + 1, "SWAP-3"]);
				// swapOrderArray.push([[...arr], j, j + 1, "SWAP-4"]);
				swapOrderArray.push([j, j + 1, "SWAP-4"]);
			} else {
				// swapOrderArray.push([[...arr], j, j + 1, "DONE-1"]);
				swapOrderArray.push([j, j + 1, "DONE-1"]);
				break;
			}
		}
		// swapOrderArray.push([[...arr], j, j + 1, "DONE-2"]);
		swapOrderArray.push([j, j + 1, "DONE-2"]);
		prevSorted = j + 1;
		// swapOrderArray.push([[...arr], j, j + 1, "DONE-3"]);
		if (i === arr.length - 1) swapOrderArray.push([j, j + 1, "DONE-3"]);
	}
	for (let i = 0; i < arr.length; i++) {
		// swapOrderArray.push([[...arr], i, i, "COLOR-SORTED"]);
		swapOrderArray.push([i, i, "COLOR-SORTED"]);
	}
	// swapOrderArray.push([[...arr], null, null, "ALL-SORTED"]);
	swapOrderArray.push([null, null, "ALL-SORTED"]);
	return swapOrderArray;
	// return arr;
}

function swap(arr, i, j) {
	[arr[i], arr[j]] = [arr[j], arr[i]];
}

let arr = getRandomArray();
insertionSort(arr);
