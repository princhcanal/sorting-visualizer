export const radixSort = (nums) => {
	let maxDigit = mostDigits(nums);
	const swapOrderArray = [];

	swapOrderArray.push([0, nums.length, "GET-DIGIT-COLORS"]);

	for (let k = 0; k < maxDigit; k++) {
		let digitBuckets = Array.from({ length: 10 }, () => []);

		for (let i = 0; i < nums.length; i++) {
			swapOrderArray.push([i, i, "CURRENT-INIT"]);
			let digit = getDigit(nums[i], k);
			digitBuckets[digit].push(nums[i]);
			swapOrderArray.push([i, digit, "CURRENT-COLOR"]);
		}

		let temp = nums;
		nums = [].concat(...digitBuckets);
		for (let i = 0; i < nums.length; i++) {
			let idx = temp.join(",").split(",").indexOf(nums[i].toString(), i);
			swapOrderArray.push([i, idx, "CURRENT-PLACE-1"]);
			if (i !== idx) swapOrderArray.push([i, idx, "CURRENT-PLACE-2"]);
			swapOrderArray.push([i, idx, "CURRENT-PLACE-3"]);
			swap(temp, i, idx);
		}
	}

	for (let i = 0; i < nums.length; i++) {
		swapOrderArray.push([i, i, "COLOR-SORTED"]);
	}

	return swapOrderArray;
};

const swap = (arr, idx1, idx2) => {
	[arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
};

const getDigit = (num, i) => {
	return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
};

const digitCount = (num) => {
	if (num === 0) return 1;
	return Math.floor(Math.log10(Math.abs(num))) + 1;
};

const mostDigits = (nums) => {
	let maxDigits = 0;
	for (let num of nums) {
		maxDigits = Math.max(maxDigits, digitCount(num));
	}
	return maxDigits;
};

// console.log(radixSort([3, 235, 3243, 3, 2, 34, 35325]));
