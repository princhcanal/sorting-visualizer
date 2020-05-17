function mergeSortRecursive(arr) {
	if (arr.length <= 1) {
		return arr;
	}
	let mid = Math.floor(arr.length / 2);
	let left = mergeSortRecursive(arr.slice(0, mid));
	let right = mergeSortRecursive(arr.slice(mid));

	return mergeRecursive(left, right);
}

function mergeRecursive(arr1, arr2) {
	let res = [];
	let i = 0;
	let j = 0;

	while (i < arr1.length || j < arr2.length) {
		if (arr1[i] < arr2[j]) {
			res.push(arr1[i]);
			i++;
		} else {
			res.push(arr2[j]);
			j++;
		}

		if (i === arr1.length) {
			while (j < arr2.length) {
				res.push(arr2[j]);
				j++;
			}
		} else if (j === arr2.length) {
			while (i < arr1.length) {
				res.push(arr1[i]);
				i++;
			}
		}
	}

	return res;
}

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
			// console.log("a:", aIndex, a, "b:", bIndex, b);

			// pre-merge 3 subarrs into 2 if there are odd number of subarrs
			if (oddNumbered && i === result.length - 3) {
				let last = result[i + 2][0];
				let lastIndex = result[i + 2][1] + result[i + 2][0].length - 1;
				// console.log("last:", lastIndex, last);
				b = mergeIterative(
					arr,
					b,
					last,
					result[i + 1][1],
					result[i + 2][1],
					lastIndex,
					swapOrderArray
				)[0];
				// bIndex += lastIndex - aIndex - 1;
				bIndex = lastIndex;
				// console.log("b:", bIndex, b);
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
			// console.log("merged:", merged);
			temp.push(merged);
			// console.log("temp:", temp, "\n");
		}
		// current level merged, update result
		result = temp;
		// console.log("result:", result, "\n");
	}
	// return result[0];
	swapOrderArray.push([[...arr], 0, 0, "ALL-SORTED"]);
	return swapOrderArray;
}

function mergeIterative(arr, arr1, arr2, start, mid, end, swapOrderArray) {
	let res = [];
	let i = 0;
	let j = 0;
	let compIdx1 = start;
	let compIdx2 = mid;
	// console.log("start:", start, "end:", end);
	// console.log("startA:", compIdx1, "startB:", compIdx2);

	while (i < arr1.length && j < arr2.length) {
		swapOrderArray.push([[...arr], compIdx1, compIdx2, "COMPARING"]);
		if (arr1[i] < arr2[j]) {
			swapOrderArray.push([[...arr], compIdx1++, compIdx2, "CASE-LEFT"]);
			res.push(arr1[i]);
			i++;
		} else {
			swapOrderArray.push([
				[...arr],
				compIdx1,
				compIdx2,
				"CASE-RIGHT-INIT",
			]);
			let temp = arr[compIdx2];
			for (let k = compIdx2; k > compIdx1; k--) {
				arr[k] = arr[k - 1];
			}
			arr[compIdx1] = temp;
			swapOrderArray.push([
				[...arr],
				compIdx1,
				compIdx2++,
				"CASE-RIGHT-SHIFT",
			]);
			swapOrderArray.push([
				[...arr],
				compIdx1,
				++compIdx1,
				"CASE-RIGHT-REVERT",
			]);
			res.push(arr2[j]);
			j++;
		}
	}

	while (i < arr1.length) {
		swapOrderArray.push([[...arr], compIdx1, compIdx2, "ONE-SIDE"]);
		res.push(arr1[i]);
		i++;
		compIdx1++;
	}

	while (j < arr2.length) {
		swapOrderArray.push([[...arr], compIdx2, compIdx1, "ONE-SIDE"]);
		res.push(arr2[j]);
		j++;
		compIdx2++;
	}

	swapOrderArray.push([[...arr], start, end, "MERGED"]);

	return [res, start, end];
}

function getRandomNum(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomArray = () => {
	const newRandomHeights = [];
	for (let i = 0; i < 6; i++) {
		newRandomHeights.push(getRandomNum(5, 450));
	}
	return newRandomHeights;
};

let arr = getRandomArray();
// console.log(arr, "\n");
mergeSortRecursive(arr);
// console.log(arr);
