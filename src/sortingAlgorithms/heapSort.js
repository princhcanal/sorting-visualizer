export const heapSort = (arr) => {
	const swapOrderArray = [];
	let n = arr.length;
	let depths = getDepths(arr);

	swapOrderArray.push([depths, n, "GET-LEVELS"]);
	for (let i = 0; i < n; i++) {
		swapOrderArray.push([i, depths[i], "COLOR-LEVEL"]);
	}

	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		heapify(arr, n, i, swapOrderArray);
	}

	for (let i = n - 1; i > 0; i--) {
		swapOrderArray.push([0, i, "ROOT-TO-LAST"]);
		swapOrderArray.push([0, i, "SWAPPING-1"]);
		swap(arr, 0, i);
		swapOrderArray.push([0, i, "SWAPPING-2"]);
		swapOrderArray.push([0, i, "LAST-SORTED"]);
		heapify(arr, i, 0, swapOrderArray);
	}

	swapOrderArray.push([0, 0, "FIRST-SORTED"]);
	swapOrderArray.push([null, null, "ALL-SORTED"]);
	return swapOrderArray;
};

const heapify = (arr, n, i, swapOrderArray) => {
	let largest = i;
	let left = 2 * i + 1;
	let right = 2 * i + 2;
	let children = [];

	if (left < n && arr[left] > arr[largest]) {
		largest = left;
	}

	if (right < n && arr[right] > arr[largest]) {
		largest = right;
	}

	if (left < n) {
		children.push(left);
	}
	if (right < n) {
		children.push(right);
	}

	swapOrderArray.push([i, children, "SUB-HEAP"]);

	if (largest !== i) {
		swapOrderArray.push([largest, children, "LARGEST-1"]);
		swapOrderArray.push([i, largest, "SWAPPING-1"]);
		swap(arr, i, largest);
		swapOrderArray.push([i, largest, "SWAPPING-2"]);
		swapOrderArray.push([i, children, "SWAPPING-3"]);
		heapify(arr, n, largest, swapOrderArray);
	} else {
		swapOrderArray.push([largest, children, "LARGEST-1"]);
		swapOrderArray.push([largest, children, "LARGEST-2"]);
	}
};

const getDepths = (arr) => {
	return arr.map((_, i, arr) => {
		return getDepth(arr, i);
	});
};

const getDepth = (arr, i) => {
	let parent = Math.ceil(i / 2) - 1;

	if (parent >= 0) {
		return 1 + getDepth(arr, parent);
	}
	return 0;
};

const swap = (arr, idx1, idx2) => {
	[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
};

// let arr = [3, 1, 0, 9, 4];
// heapSort(arr);
// console.log(arr);
