export const handleSwap = (ref, heights, idx1, idx2) => {
	let bars = ref.current.children;
	let temp = bars[idx1].style.height;
	bars[idx1].style.height = bars[idx2].style.height;
	bars[idx2].style.height = temp;
	if (heights.length <= 20) {
		bars[idx1].children[0].innerHTML = bars[idx1].style.height.slice(
			0,
			temp.indexOf("px")
		);
		bars[idx2].children[0].innerHTML = bars[idx2].style.height.slice(
			0,
			temp.indexOf("px")
		);
	}
};
