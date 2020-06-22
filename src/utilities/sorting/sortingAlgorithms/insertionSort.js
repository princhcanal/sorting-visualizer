const { getRandomArray } = require("../../numbers");

export function insertionSort(arr) {
	let swapOrderArray = [];
	let prevSorted = -1;

	for (let i = 1; i < arr.length; i++) {
		let current = arr[i];
		swapOrderArray.push([prevSorted, i, "START"]);

		for (var j = i - 1; j >= 0; j--) {
			if (arr[j] > current) {
				swapOrderArray.push([j, j + 1, "SWAPPING-1"]);
				swapOrderArray.push([j, j + 1, "SWAPPING-2"]);
				swap(arr, j, j + 1);
				swapOrderArray.push([j, j + 1, "SWAPPING-3"]);
				swapOrderArray.push([j, j + 1, "SWAPPING-4"]);
			} else {
				swapOrderArray.push([j, j + 1, "DONE-1"]);
				break;
			}
		}

		swapOrderArray.push([j, j + 1, "DONE-2"]);
		prevSorted = j + 1;

		if (i === arr.length - 1) swapOrderArray.push([j, j + 1, "DONE-3"]);
	}

	for (let i = 0; i < arr.length; i++) {
		swapOrderArray.push([i, i, "COLOR-SORTED"]);
	}

	return swapOrderArray;
}

function swap(arr, i, j) {
	[arr[i], arr[j]] = [arr[j], arr[i]];
}

let arr = getRandomArray();
insertionSort(arr);
