export function bubbleSort(arr) {
	// let noSwaps;
	let swapOrderArr = [];
	for (let i = arr.length - 1; i >= 0; i--) {
		// noSwaps = true;
		for (let j = 0; j < i; j++) {
			if (arr[j] > arr[j + 1]) {
				swap2(arr, j, j + 1);
				// noSwaps = false;
				swapOrderArr.push([[...arr], j, j + 1]);
			}
		}
		// if (noSwaps) break;
	}

	return swapOrderArr;
	// return arr;
}

function swap2(arr, ind1, ind2) {
	[arr[ind1], arr[ind2]] = [arr[ind2], arr[ind1]];
}

// console.log(bubbleSort([5, 3, 9, 2]));
// console.log(bubbleSort([5, 1, 2, 3, 4]));
// bubbleSort([15, 7, 4, 11, 12, 11]);
