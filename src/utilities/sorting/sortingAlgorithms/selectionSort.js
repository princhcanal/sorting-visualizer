export function selectionSort(arr) {
	let swapOrderArr = [];

	for (let i = 0; i < arr.length; i++) {
		let min = i;

		swapOrderArr.push([i, min, "GET-INITIAL"]);

		for (let j = i + 1; j < arr.length; j++) {
			swapOrderArr.push([j, min, "CHECK-MIN"]);

			if (arr[j] < arr[min]) {
				let prevMin;

				if (min === i) {
					prevMin = null;
				} else {
					prevMin = min;
				}

				min = j;
				swapOrderArr.push([j, prevMin, "CHANGE-MIN"]);
			} else {
				swapOrderArr.push([j, min, "CHANGE-BACK"]);
			}
		}

		if (min !== i) {
			swapOrderArr.push([i, min, "SWAPPING-1"]);
			swap(arr, i, min);
			swapOrderArr.push([i, min, "SWAPPING-2"]);
			swapOrderArr.push([i, min, "SWAPPING-3"]);
		} else {
			swapOrderArr.push([i, min, "NO-SWAP"]);
		}
	}

	return swapOrderArr;
}

function swap(arr, ind1, ind2) {
	[arr[ind1], arr[ind2]] = [arr[ind2], arr[ind1]];
}
