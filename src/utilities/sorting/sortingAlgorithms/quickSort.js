export function quickSortLomuto(
	arr,
	left = 0,
	right = arr.length - 1,
	swapOrderArray = []
) {
	quickSort(arr, left, right, swapOrderArray);
	return swapOrderArray;
}

function quickSort(arr, left = 0, right = arr.length - 1, swapOrderArray) {
	if (left < right) {
		let pivotIndex = pivotLomuto(arr, left, right, swapOrderArray);
		quickSort(arr, left, pivotIndex - 1, swapOrderArray);
		quickSort(arr, pivotIndex + 1, right, swapOrderArray);
	} else if (left === right) {
		swapOrderArray.push([left, right, "SORTED-1"]);
		swapOrderArray.push([left, right, "SORTED-2"]);
	}

	return swapOrderArray;
}

function pivotLomuto(arr, start = 0, end = arr.length - 1, swapOrderArray) {
	let pivot = arr[start];
	let pivotIndex = start;

	swapOrderArray.push([start, end, "GET-PIVOT"]);

	for (let i = start + 1; i <= end; i++) {
		swapOrderArray.push([i, pivotIndex, "COMPARE"]);

		if (pivot > arr[i]) {
			pivotIndex++;

			if (pivotIndex !== i) {
				swapOrderArray.push([pivotIndex, i, "SWAPPING-1"]);
				swapOrderArray.push([pivotIndex, i, "SWAPPING-2"]);
				swap(arr, pivotIndex, i);
				swapOrderArray.push([pivotIndex, i, "SWAPPING-3"]);
				swapOrderArray.push([[start, pivotIndex], i, "SWAPPING-4"]);
			} else {
				swapOrderArray.push([start, i, "SAME-INDEX-1"]);
				swapOrderArray.push([start, i, "SAME-INDEX-2"]);
			}
		} else {
			swapOrderArray.push([i, pivotIndex, "GREATER"]);
		}
	}

	if (pivotIndex !== start) {
		swapOrderArray.push([start, pivotIndex, "SWAP-PIVOT-1"]);
		swap(arr, start, pivotIndex);
		swapOrderArray.push([start, pivotIndex, "SWAP-PIVOT-2"]);
		swapOrderArray.push([start, pivotIndex, "SWAP-PIVOT-3"]);
	} else {
		swapOrderArray.push([start, pivotIndex, "NO-CHANGE"]);
	}

	if (pivotIndex !== end) {
		swapOrderArray.push([[start, pivotIndex], end + 1, "REVERT-BOTH"]);
	} else {
		swapOrderArray.push([start, pivotIndex, "REVERT-LEFT"]);
	}

	return pivotIndex;
}

// function quickSortHoare(arr, start, end, swapOrderArray) {
// 	if (start < end) {
// 		let pivotIndex = pivotHoare(arr, start, end, swapOrderArray);
// 		quickSortHoare(arr, start, pivotIndex, swapOrderArray);
// 		quickSortHoare(arr, pivotIndex + 1, end, swapOrderArray);
// 	} else {
// 	}
// }

// function pivotHoare(arr, start = 0, end = arr.length - 1, swapOrderArray) {
// 	let mid = Math.floor((start + end) / 2);
// 	let pivot = arr[mid];
// 	let i = start;
// 	let j = end;

// 	swapOrderArray.push([mid, mid, "GET-PIVOT"]);

// 	while (true) {
// 		while (arr[i] < pivot) {
// 			i++;
// 		}

// 		while (arr[j] > pivot) {
// 			j--;
// 		}

// 		if (i >= j) {
// 			return j;
// 		}

// 		swap(arr, i++, j--);
// 	}
// }

function swap(arr, i, j) {
	[arr[i], arr[j]] = [arr[j], arr[i]];
}
