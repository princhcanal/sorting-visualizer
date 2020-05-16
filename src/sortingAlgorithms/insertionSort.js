function insertionSort(arr) {
	for (let i = 1; i < arr.length; i++) {
		let current = arr[i];
		console.log(current);
		for (var j = i - 1; j >= 0 && arr[j] > current; j--) {
			console.log(arr[j]);
			arr[j + 1] = arr[j];
			console.log(arr);
		}
		arr[j + 1] = current;
		console.log(arr, "\n");
	}
	return arr;
}

// console.log(insertionSort([5, 3, 9, 2]));
// console.log(insertionSort([5, 1, 2, 3, 4]));
insertionSort([15, 7, 4, 11, 12, 11]);
