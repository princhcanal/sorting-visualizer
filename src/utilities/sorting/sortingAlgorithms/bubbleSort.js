export function bubbleSort(arr) {
	let noSwaps;
	let isSwap = false;
	let swapOrderArr = [];
	let j;

	for (let i = arr.length - 1; i >= 0; i--) {
		noSwaps = true;

		for (j = 0; j < i; j++) {
			if (arr[j] > arr[j + 1]) {
				swap(arr, j, j + 1);
				noSwaps = false;
				isSwap = true;
			}

			swapOrderArr.push([j, j + 1, "COMPARING"]);
			if (isSwap) {
				swapOrderArr.push([j, j + 1, "SWAPPING-1"]);
				swapOrderArr.push([j, j + 1, "SWAPPING-2"]);
			}
			isSwap = false;
		}

		swapOrderArr.push([j - 1, j, "LAST-SORTED"]);
		if (noSwaps) {
			for (let k = 0; k <= j; k++) {
				swapOrderArr.push([k, j, "NO-SWAPS"]);
			}
			break;
		}
	}

	return swapOrderArr;
}

function swap(arr, ind1, ind2) {
	[arr[ind1], arr[ind2]] = [arr[ind2], arr[ind1]];
}
