export function bubbleSort(arr) {
	let noSwaps;
	let isSwap = false;
	let swapOrderArr = [];
	let j;
	for (let i = arr.length - 1; i >= 0; i--) {
		noSwaps = true;
		for (j = 0; j < i; j++) {
			if (arr[j] > arr[j + 1]) {
				swap2(arr, j, j + 1);
				noSwaps = false;
				isSwap = true;
			}
			swapOrderArr.push([[...arr], j, j + 1, "COMPARING"]);
			// swapOrderArr.push([[...arr], j, j + 1, "RESET"]);
			if (isSwap) {
				swapOrderArr.push([[...arr], j, j + 1, "SWAPPING-1"]);
				swapOrderArr.push([[...arr], j, j + 1, "SWAPPING-2"]);
				// swapOrderArr.push([[...arr], j, j + 1, "SWAPPING-3"]);
			}
			isSwap = false;
		}
		swapOrderArr.push([[...arr], j - 1, j, "LAST-SORTED"]);
		if (noSwaps) {
			for (let k = 0; k <= j; k++) {
				swapOrderArr.push([[...arr], k, j, "NO-SWAPS"]);
			}
			break;
		}
	}

	swapOrderArr.push([[...arr], 0, 0, "ALL-SORTED"]);

	return swapOrderArr;
	// return arr;
}

function swap2(arr, ind1, ind2) {
	[arr[ind1], arr[ind2]] = [arr[ind2], arr[ind1]];
}

// console.log(bubbleSort([5, 3, 9, 2]));
// console.log(bubbleSort([5, 1, 2, 3, 4]));
// bubbleSort([15, 7, 4, 11, 12, 11]);
