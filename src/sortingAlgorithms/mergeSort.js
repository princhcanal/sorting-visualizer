let originalArr = [10, 24, 76, 73, 72, 1, 9, 8];

function mergeSortRecursive(arr, start, end) {
	if (arr.length <= 1) return arr;

	let mid = Math.floor(arr.length / 2);
	let left = mergeSortRecursive(arr, start, mid);
	let right = mergeSortRecursive(arr, mid + 1, end);

	return merge(left, right, start, end);
}

function merge(arr1, arr2, start, end) {
	let res = [];
	// let i = 0;
	// let j = 0;
	let i = start;
	let j = end;

	console.log("start: ", arr1, arr2);

	while (i < arr1.length || j < arr2.length) {
		if (arr1[i] < arr2[j]) {
			res.push(arr1[i]);
			console.log("mid", res);
			i++;
		} else {
			res.push(arr2[j]);
			console.log("mid", res);
			j++;
		}

		if (i === arr1.length) {
			while (j < arr2.length) {
				res.push(arr2[j]);
				console.log("mid", res);
				j++;
			}
		} else if (j === arr2.length) {
			while (i < arr1.length) {
				res.push(arr1[i]);
				console.log("mid", res);
				i++;
			}
		}
	}

	console.log("res: ", res, "\n");

	return res;
}

// console.log(merge([1, 10, 50], [2, 4, 99, 100]));
// console.log(mergeSortRecursive([10, 24, 76, 73, 72, 1, 9]));
// console.log(mergeSortIterative([10, 24, 76, 73, 72, 1, 9]));
console.log(originalArr, "\n");
mergeSortRecursive(originalArr, 0, originalArr.length);
