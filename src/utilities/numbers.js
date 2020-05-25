export function getRandomNum(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomArray = () => {
	const randomArray = [];
	for (let i = 0; i < 20; i++) {
		randomArray.push(getRandomNum(5, 450));
	}
	return randomArray;
};

export function arraysAreEqual(arrayOne, arrayTwo) {
	if (arrayOne.length !== arrayTwo.length) return false;
	for (let i = 0; i < arrayOne.length; i++) {
		if (arrayOne[i] !== arrayTwo[i]) {
			return false;
		}
	}
	return true;
}
