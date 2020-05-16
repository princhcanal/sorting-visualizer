export function selectionSort(arr) {
	let swapOrderArr = [];
	for (let i = 0; i < arr.length; i++) {
		let min = i;
		swapOrderArr.push([[...arr], i, min, "GET-INITIAL"]);
		for (let j = i + 1; j < arr.length; j++) {
			swapOrderArr.push([[...arr], j, min, "CHECK-MIN"]);
			if (arr[j] < arr[min]) {
				let prevMin;
				if (min === i) {
					prevMin = null;
				} else {
					prevMin = min;
				}
				min = j;
				swapOrderArr.push([[...arr], j, prevMin, "CHANGE-MIN"]);
			} else {
				swapOrderArr.push([[...arr], j, min, "CHANGE-BACK"]);
			}
		}
		if (min !== i) {
			swap(arr, i, min);
			swapOrderArr.push([[...arr], i, min, "SWAPPING-1"]);
			swapOrderArr.push([[...arr], i, min, "SWAPPING-2"]);
		} else {
			swapOrderArr.push([[...arr], i, min, "NO-SWAP"]);
		}
	}

	swapOrderArr.push([[...arr], null, null, "ALL-SORTED"]);
	return swapOrderArr;
	// return arr;
}

function swap(arr, ind1, ind2) {
	[arr[ind1], arr[ind2]] = [arr[ind2], arr[ind1]];
}

// console.log(selectionSort([5, 3, 9, 2]));
// console.log(selectionSort([5, 1, 2, 3, 4]));
// console.log(selectionSort([15, 7, 4, 11, 12, 11]));
selectionSort([15, 7, 4, 11, 12, 11]);
