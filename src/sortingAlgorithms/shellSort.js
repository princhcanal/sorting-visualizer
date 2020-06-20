export const shellSort = (arr) => {
	const swapOrderArray = [];
	let n = arr.length;

	for (
		let interval = Math.floor(n / 2);
		interval > 0;
		interval = Math.floor(interval / 2)
	) {
		for (let i = interval; i < n; i++) {
			let temp = arr[i];
			var j;

			for (j = i; j >= interval; j -= interval) {
				swapOrderArray.push([j - interval, j, "COMPARING"]);
				if (arr[j - interval] > temp) {
					swapOrderArray.push([j - interval, j, "SWAPPING-1"]);
					arr[j] = arr[j - interval];
					swapOrderArray.push([j - interval, j, "SWAPPING-2"]);
				} else {
					break;
				}
			}

			arr[j] = temp;
		}
		swapOrderArray.push([0, n, "NEW-INTERVAL"]);
	}

	for (let i = 0; i < n; i++) {
		swapOrderArray.push([i, i, "COLOR-SORTED"]);
	}

	return swapOrderArray;
};

// let arr = [4, 2, 3, -2, 9];
// console.log(arr);
// shellSort(arr);
// console.log(arr);
