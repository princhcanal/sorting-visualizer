export function getQuickSortSwapOrder(
	arr,
	left = 0,
	right = arr.length - 1,
	swapOrderArray
) {
	quickSort(arr, left, right, swapOrderArray);
	swapOrderArray.push([[...arr], left, right, "ALL-SORTED"]);
	return swapOrderArray;
}

function quickSort(arr, left = 0, right = arr.length - 1, swapOrderArray) {
	if (left < right) {
		let pivotIndex = pivot(arr, left, right, swapOrderArray);
		quickSort(arr, left, pivotIndex - 1, swapOrderArray);
		quickSort(arr, pivotIndex + 1, right, swapOrderArray);
	} else if (left === right) {
		swapOrderArray.push([[...arr], left, right, "SORTED-1"]); // red left
		swapOrderArray.push([[...arr], left, right, "SORTED-2"]); // green left
	}
	return swapOrderArray;
}

function pivot(arr, start = 0, end = arr.length - 1, swapOrderArray) {
	let pivot = arr[start];
	let pivotIndex = start;

	swapOrderArray.push([[...arr], start, end, "GET-PIVOT"]); // red start

	for (let i = start + 1; i <= end; i++) {
		swapOrderArray.push([[...arr], i, pivotIndex, "COMPARE"]); // yellow i
		if (pivot > arr[i]) {
			pivotIndex++;
			swapOrderArray.push([[...arr], pivotIndex, i, "SWAP-1"]); // orange i
			if (pivotIndex !== i) {
				swapOrderArray.push([[...arr], pivotIndex, i, "SWAP-2"]); // orange pivotIndex
				swap(arr, pivotIndex, i);
				swapOrderArray.push([[...arr], pivotIndex, i, "SWAP-3"]); // swap
				swapOrderArray.push([[...arr], pivotIndex, i, "SWAP-4"]); // blue, white
			} else {
				swapOrderArray.push([[...arr], pivotIndex, i, "SAME-INDEX"]); // blue pivotIndex
			}
		} else {
			swapOrderArray.push([[...arr], i, pivotIndex, "REVERT"]); // white i
		}
	}
	if (pivotIndex !== start) {
		swapOrderArray.push([[...arr], start, pivotIndex, "SWAP-PIVOT-1"]); // red pivotIndex
		swap(arr, start, pivotIndex);
		swapOrderArray.push([[...arr], start, pivotIndex, "SWAP-PIVOT-2"]); // swap
		swapOrderArray.push([[...arr], start, pivotIndex, "SWAP-PIVOT-3"]); // blue, green
		swapOrderArray.push([[...arr], start, pivotIndex, "REVERT-ALL-1"]); // default start to (pivotIndex - 1)
	} else {
		swapOrderArray.push([[...arr], start, pivotIndex, "NO-CHANGE"]); // green start
	}
	if (pivotIndex !== end) {
		swapOrderArray.push([
			[...arr],
			pivotIndex + 1,
			end + 1,
			"REVERT-ALL-2",
		]); // default (pivotIndex + 1) to (end)
	}
	// console.log(pivotIndex, "\n");
	return pivotIndex;
}

function swap(arr, i, j) {
	[arr[i], arr[j]] = [arr[j], arr[i]];
}

// let arr = [5, 2, 1, 8];

// console.log(arr);
// quickSort(arr, 0, arr.length - 1, []);
// console.log(arr);
// console.log(quickSort([4, 6, 9, 1, 2, 5]));
