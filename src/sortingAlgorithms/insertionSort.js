const { getRandomArray } = require("../utilities/numbers");

export function insertionSort(arr) {
	let swapOrderArray = [];
	// console.log(arr, "\n");
	for (let i = 1; i < arr.length; i++) {
		let current = arr[i];
		// console.log("current:", current);
		swapOrderArray.push([[...arr], i, null, "START"]); // yellow
		// swapOrderArray.push([[...arr], i - 1, i, "SWAP-1"]); // yellow
		for (var j = i - 1; j >= 0; j--) {
			if (arr[j] > current) {
				// if (i !== 1 && j !== i - 1)
				swapOrderArray.push([[...arr], j, j + 1, "SWAP-1"]); // yellow
				swapOrderArray.push([[...arr], j, j + 1, "SWAP-2"]); // both red
				// console.log("", arr[j]);
				swap(arr, j, j + 1);
				swapOrderArray.push([[...arr], j, j + 1, "SWAP-3"]); // swap
				swapOrderArray.push([[...arr], j, j + 1, "SWAP-4"]); // blue
				// console.log(arr);
				// arr[j + 1] = arr[j];
			} else {
				swapOrderArray.push([[...arr], j, j + 1, "DONE-1"]);
				break;
			}
		}
		swapOrderArray.push([[...arr], j, j + 1, "DONE-2"]);
		swapOrderArray.push([[...arr], j, j + 1, "DONE-3"]);
		// swapOrderArray.push([[...arr], j, j + 1, "SORTED"]); // blue
		// arr[j + 1] = current;
		// console.log(arr, "\n");
	}
	for (let i = 0; i < arr.length; i++) {
		swapOrderArray.push([[...arr], i, i, "COLOR-SORTED"]);
	}
	swapOrderArray.push([[...arr], null, null, "ALL-SORTED"]);
	return swapOrderArray;
	// return arr;
}

function swap(arr, i, j) {
	[arr[i], arr[j]] = [arr[j], arr[i]];
}

let arr = getRandomArray();
insertionSort(arr);
