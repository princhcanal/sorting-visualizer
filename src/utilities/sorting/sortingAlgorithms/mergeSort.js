export function mergeSortIterative(arr) {
	let swapOrderArray = [];
	// break arr into individual arrs of single integers
	let result = arr.map((num, i) => [[num], i]);

	// keep merging until result contains a single arr
	while (result.length > 1) {
		const oddNumbered = result.length % 2 !== 0;
		let temp = [];

		// iterate 2 subarrs at a time and merge into larger subarr
		for (let i = 0; i < result.length; i += 2) {
			let a = result[i][0];
			let b = result[i + 1][0];
			let aIndex = result[i][1];
			let bIndex = result[i + 1][1] + result[i + 1][0].length - 1;
			let bIndexStart = result[i + 1][1];

			// pre-merge 3 subarrs into 2 if there are odd number of subarrs
			if (oddNumbered && i === result.length - 3) {
				let last = result[i + 2][0];
				let lastIndex = result[i + 2][1] + result[i + 2][0].length - 1;

				b = mergeIterative(
					arr,
					b,
					last,
					result[i + 1][1],
					result[i + 2][1],
					lastIndex,
					swapOrderArray
				)[0];

				bIndex = lastIndex;
				i++;
			}

			// accumulate intermediate result
			let merged = mergeIterative(
				arr,
				a,
				b,
				aIndex,
				bIndexStart,
				bIndex,
				swapOrderArray
			);
			temp.push(merged);
		}

		// current level merged, update result
		result = temp;
	}

	return swapOrderArray;
}

function mergeIterative(arr, arr1, arr2, start, mid, end, swapOrderArray) {
	let res = [];
	let i = 0;
	let j = 0;
	let compIdx1 = start;
	let compIdx2 = mid;

	if (start === 0 && end === arr.length - 1) {
		swapOrderArray.push([[start, mid - 1], [mid, end], "MERGING-1-LAST"]);
	} else {
		swapOrderArray.push([[start, mid - 1], [mid, end], "MERGING-1"]);
	}

	swapOrderArray.push([[start, mid - 1], [mid, end], "MERGING-2"]);

	while (i < arr1.length && j < arr2.length) {
		swapOrderArray.push([compIdx1, compIdx2, "COMPARING"]);
		if (arr1[i] < arr2[j]) {
			swapOrderArray.push([compIdx1++, compIdx2, "CASE-LEFT"]);
			res.push(arr1[i]);
			i++;
		} else {
			swapOrderArray.push([compIdx1, compIdx2, "CASE-RIGHT-INIT"]);
			let temp = arr[compIdx2];
			for (let k = compIdx2; k > compIdx1; k--) {
				arr[k] = arr[k - 1];
			}
			arr[compIdx1] = temp;
			swapOrderArray.push([compIdx1, compIdx2++, "CASE-RIGHT-SHIFT"]);
			swapOrderArray.push([compIdx1, ++compIdx1, "CASE-RIGHT-REVERT"]);
			res.push(arr2[j]);
			j++;
		}
	}

	while (i < arr1.length) {
		swapOrderArray.push([compIdx1, compIdx2, "ONE-SIDE"]);
		res.push(arr1[i]);
		i++;
		compIdx1++;
	}

	while (j < arr2.length) {
		swapOrderArray.push([compIdx2, compIdx1, "ONE-SIDE"]);
		res.push(arr2[j]);
		j++;
		compIdx2++;
	}

	return [res, start, end];
}

export function mergeSortRecursive(arr) {
	const swapOrderArray = [];
	if (arr.length <= 1) return arr;
	mergeSortHelper(arr, 0, arr.length - 1, swapOrderArray);
	return swapOrderArray;
}

function mergeSortHelper(arr, start, end, swapOrderArray) {
	if (start === end) return;
	const mid = Math.floor((start + end) / 2);
	mergeSortHelper(arr, start, mid, swapOrderArray);
	mergeSortHelper(arr, mid + 1, end, swapOrderArray);
	mergeRecursive(arr, start, mid, end, swapOrderArray);
}

function mergeRecursive(arr, start, mid, end, swapOrderArray) {
	let i = start;
	let j = mid + 1;
	let compIdx1 = start;
	let compIdx2 = mid + 1;

	if (start === 0 && end === arr.length - 1) {
		swapOrderArray.push([[start, mid], [mid + 1, end], "MERGING-1-LAST"]);
	} else {
		swapOrderArray.push([[start, mid], [mid + 1, end], "MERGING-1"]);
	}

	swapOrderArray.push([[start, mid], [mid + 1, end], "MERGING-2"]);

	while (i <= mid && j <= end) {
		swapOrderArray.push([compIdx1, compIdx2, "COMPARING"]);
		if (arr[compIdx1] <= arr[compIdx2]) {
			swapOrderArray.push([compIdx1++, compIdx2, "CASE-LEFT"]);
			i++;
		} else {
			swapOrderArray.push([compIdx1, compIdx2, "CASE-RIGHT-INIT"]);
			let temp = arr[compIdx2];
			for (let g = compIdx2; g > compIdx1; g--) {
				arr[g] = arr[g - 1];
			}
			arr[compIdx1] = temp;
			swapOrderArray.push([compIdx1, compIdx2++, "CASE-RIGHT-SHIFT"]);
			swapOrderArray.push([compIdx1, ++compIdx1, "CASE-RIGHT-REVERT"]);
			j++;
		}
	}

	while (i <= mid) {
		swapOrderArray.push([compIdx1, compIdx1, "ONE-SIDE"]);
		compIdx1++;
		i++;
	}
	while (j <= end) {
		swapOrderArray.push([compIdx2, compIdx2, "ONE-SIDE"]);
		compIdx2++;
		j++;
	}
}
