export const radixSort = (nums) => {
	let maxDigit = mostDigits(nums);
	const swapOrderArray = [];

	for (let k = 0; k < maxDigit; k++) {
		let digitBuckets = Array.from({ length: 10 }, () => []);

		for (let i = 0; i < nums.length; i++) {
			swapOrderArray.push([i, k, "CURRENT-INIT"]);
			let digit = getDigit(nums[i], k);
			digitBuckets[digit].push(nums[i]);
			swapOrderArray.push([i, [digit, k], "CURRENT-COLOR"]);
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
