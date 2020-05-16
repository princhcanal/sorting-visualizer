let swapOrderArray = [];

function mergeSortRecursive(arr) {
	if (arr.length <= 1) {
		// console.log(arr);
		return arr;
		// return arr;
	}

	let mid = Math.floor(arr.length / 2);
	let left = mergeSortRecursive(arr.slice(0, mid));
	let right = mergeSortRecursive(arr.slice(mid));

	// return merge(left, right);
	// console.log("\nleft:", left, "right:", right);
	let merged = merge(left, right);
	// console.log("merged:", merged, "\n");
	return merged;
}

function mergeSortIterative(arr) {
	// break arr into individual arrs of single integers
	let result = arr.map((num) => [num]);

	// keep merging until result contains a single arr
	while (result.length > 1) {
		const oddNumbered = result.length % 2 !== 0;
		let temp = [];

		// iterate 2 subarrs at a time and merge into larger subarr
		for (let i = 0; i < result.length; i += 2) {
			let a = result[i];
			let b = result[i + 1];

			// pre-merge 3 subarrs into 2 if there are odd number of subarrs
			if (oddNumbered && i === result.length - 3) {
				b = merge(b, result[i + 2]);
				i++;
			}
			// accumulate intermediate result
			temp.push(merge(a, b));
		}
		// current level merged, update result
		result = temp;
		// console.log(result);
	}
	return result[0];
}

function merge(arr1, arr2) {
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

function mergeMergedToMainArray() {}

// console.log(merge([1, 10, 50], [2, 4, 99, 100]));
// console.log(mergeSortRecursive([10, 24, 76, 73, 72, 1, 9]));
// console.log(mergeSortIterative([10, 24, 76, 73, 72, 1, 9]));
let arr = [10, 24, 76, 73, 72, 1, 9];
// console.log(arr, "\n");
mergeSortRecursive(arr);
// console.log(swapOrderArray);
