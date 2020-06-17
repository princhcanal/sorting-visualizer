import Colors from "../colors";
import { handleSwap } from "../barsManipulations";

export const insertionSortManipulations = (
	bars,
	animations,
	heights,
	ref,
	i,
	idx1,
	idx2,
	state
) => {
	if (state === "START") {
		if (idx1 >= 0) bars[idx1].style.backgroundColor = Colors.COLOR_DEFAULT;
		bars[idx2].style.backgroundColor = Colors.COLOR_COMPARING;
	} else if (state === "SWAP-1") {
		bars[idx1].style.backgroundColor = Colors.COLOR_COMPARING;
	} else if (state === "SWAP-2") {
		bars[idx1].style.backgroundColor = Colors.COLOR_SWAP;
		bars[idx2].style.backgroundColor = Colors.COLOR_SWAP;
	} else if (state === "SWAP-3") {
		handleSwap(ref, heights, idx1, idx2);
	} else if (state === "SWAP-4") {
		bars[idx1].style.backgroundColor = Colors.COLOR_COMPARING;
		bars[idx2].style.backgroundColor = Colors.COLOR_DEFAULT;
	} else if (state === "DONE-1") {
		bars[idx1].style.backgroundColor = Colors.COLOR_COMPARING;
	} else if (state === "DONE-2") {
		if (idx1 >= 0) bars[idx1].style.backgroundColor = Colors.COLOR_DEFAULT;
		bars[idx2].style.backgroundColor = Colors.COLOR_LESSER;
	} else if (state === "DONE-3") {
		bars[idx2].style.backgroundColor = Colors.COLOR_DEFAULT;
	} else if (state === "SORTED") {
		bars[idx2].style.backgroundColor = Colors.COLOR_DEFAULT;
	} else if (state === "COLOR-SORTED") {
		bars[idx1].style.backgroundColor = Colors.COLOR_SORTED;
	} else if (state === "ALL-SORTED") {
	}
};
