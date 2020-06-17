import Colors from "../colors";
import { handleSwap } from "../barsManipulations";

export const selectionSortManipulations = (
	bars,
	animations,
	heights,
	ref,
	i,
	idx1,
	idx2,
	state
) => {
	if (state === "GET-INITIAL") {
		bars[idx1].style.backgroundColor = Colors.COLOR_COMPARING;
	} else if (state === "CHECK-MIN") {
		bars[idx1].style.backgroundColor = Colors.COLOR_COMPARING;
	} else if (state === "CHANGE-BACK") {
		bars[idx1].style.backgroundColor = Colors.COLOR_DEFAULT;
	} else if (state === "CHANGE-MIN") {
		bars[idx1].style.backgroundColor = Colors.COLOR_PIVOT;
		if (idx2) {
			bars[idx2].style.backgroundColor = Colors.COLOR_DEFAULT;
		}
	} else if (state === "SWAPPING-1") {
		bars[idx1].style.backgroundColor = Colors.COLOR_SWAP;
		bars[idx2].style.backgroundColor = Colors.COLOR_SWAP;
	} else if (state === "SWAPPING-2") {
		handleSwap(ref, heights, idx1, idx2);
	} else if (state === "SWAPPING-3") {
		bars[idx1].style.backgroundColor = Colors.COLOR_SORTED;
		bars[idx2].style.backgroundColor = Colors.COLOR_DEFAULT;
	} else if (state === "NO-SWAP") {
		bars[idx1].style.backgroundColor = Colors.COLOR_SORTED;
	} else if (state === "ALL-SORTED") {
	}
};
