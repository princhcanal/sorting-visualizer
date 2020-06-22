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

export const handleColorChange = (
	bars,
	idx1,
	color1,
	idx2,
	color2,
	range = false
) => {
	if (range) {
		for (let i = idx1; i < idx2; i++) {
			bars[i].style.backgroundColor = color1;
		}
	} else if (color1 && color2) {
		bars[idx1].style.backgroundColor = color1;
		bars[idx2].style.backgroundColor = color2;
	} else if (idx2 && !color2) {
		bars[idx1].style.backgroundColor = color1;
		bars[idx2].style.backgroundColor = color1;
	} else if (!idx2 && !color2) {
		bars[idx1].style.backgroundColor = color1;
	}
};
