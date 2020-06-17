import Colors, { RANDOM_COLORS } from "../colors";

export const mergeSortManipulations = (
	bars,
	animations,
	heights,
	ref,
	i,
	idx1,
	idx2,
	state,
	otherArgs
) => {
	if (state === "MERGING-1" || state === "MERGING-1-LAST") {
		otherArgs[0] = bars[idx1[0]].style.backgroundColor;
		otherArgs[1] = bars[idx2[1]].style.backgroundColor;
		for (let j = idx1[0]; j <= idx1[1]; j++) {
			bars[j].style.backgroundColor = Colors.COLOR_SUBARRAY_1;
		}
		for (let j = idx2[0]; j <= idx2[1]; j++) {
			bars[j].style.backgroundColor = Colors.COLOR_SUBARRAY_2;
		}
	} else if (state === "MERGING-2") {
		for (let j = idx1[0]; j <= idx1[1]; j++) {
			bars[j].style.backgroundColor = otherArgs[0];
		}
		for (let j = idx2[0]; j <= idx2[1]; j++) {
			bars[j].style.backgroundColor = otherArgs[1];
		}
	} else if (state === "COMPARING") {
		bars[idx1].style.backgroundColor = Colors.COLOR_COMPARING;
		bars[idx2].style.backgroundColor = Colors.COLOR_COMPARING;
	} else if (state === "CASE-LEFT") {
		bars[idx1].style.backgroundColor = otherArgs[3];
		bars[idx2].style.backgroundColor = otherArgs[1];
	} else if (state === "CASE-RIGHT-INIT") {
		bars[idx1].style.backgroundColor = Colors.COLOR_SWAP;
		bars[idx2].style.backgroundColor = Colors.COLOR_SWAP;
	} else if (state === "CASE-RIGHT-SHIFT") {
		let temp = bars[idx2].style.height;
		for (let g = idx2; g > idx1; g--) {
			bars[g].style.height = bars[g - 1].style.height;
			if (heights.length <= 20) {
				bars[g].children[0].innerHTML = bars[g].style.height.slice(
					0,
					temp.indexOf("px")
				);
			}
		}
		bars[idx1].style.height = temp;
		if (heights.length <= 20)
			bars[idx1].children[0].innerHTML = bars[idx1].style.height.slice(
				0,
				temp.indexOf("px")
			);
		bars[idx2].style.backgroundColor = otherArgs[0];
		bars[idx1 + 1].style.backgroundColor = Colors.COLOR_SWAP;
	} else if (state === "CASE-RIGHT-REVERT") {
		bars[idx1].style.backgroundColor = otherArgs[3];
		bars[idx2].style.backgroundColor = otherArgs[0];
	} else if (state === "ONE-SIDE") {
		bars[idx1].style.backgroundColor = otherArgs[3];
		let nextState = animations[i + 1][2];
		if (nextState === "MERGING-1") {
			otherArgs[3] = RANDOM_COLORS[++otherArgs[2] % RANDOM_COLORS.length];
		} else if (nextState === "MERGING-1-LAST") {
			otherArgs[3] = Colors.COLOR_SORTED;
		}
	} else if (state === "ALL-SORTED") {
	}
};
