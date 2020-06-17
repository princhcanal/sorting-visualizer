import Colors from "../colors";
import { handleSwap } from "../barsManipulations";

export const bubbleSortManipulations = (
	bars,
	animations,
	heights,
	ref,
	i,
	idx1,
	idx2,
	state
) => {
	if (state === "COMPARING") {
		bars[idx1].style.backgroundColor = Colors.COLOR_COMPARING;
		bars[idx2].style.backgroundColor = Colors.COLOR_COMPARING;
		if (idx1 !== 0) {
			bars[idx1 - 1].style.backgroundColor = Colors.COLOR_DEFAULT;
		}
	} else if (state === "SWAPPING-1") {
		bars[idx1].style.backgroundColor = Colors.COLOR_SWAP;
		bars[idx2].style.backgroundColor = Colors.COLOR_SWAP;
	} else if (state === "SWAPPING-2") {
		handleSwap(ref, heights, idx1, idx2);
	} else if (state === "LAST-SORTED") {
		if (animations[i + 1][2] === "NO-SWAPS") {
			if (idx1 >= 0)
				bars[idx1].style.backgroundColor = Colors.COLOR_DEFAULT;
			bars[idx2].style.backgroundColor = Colors.COLOR_DEFAULT;
		} else {
			bars[idx2].style.backgroundColor = Colors.COLOR_SORTED;
			if (idx1 >= 0)
				bars[idx1].style.backgroundColor = Colors.COLOR_DEFAULT;
		}
	} else if (state === "NO-SWAPS") {
		bars[idx1].style.backgroundColor = Colors.COLOR_SORTED;
	} else if (state === "ALL-SORTED") {
	}
};
