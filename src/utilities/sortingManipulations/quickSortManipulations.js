import Colors from "../colors";
import { handleSwap } from "../barsManipulations";

export const quickSortManipulations = (
	bars,
	animations,
	heights,
	ref,
	i,
	idx1,
	idx2,
	state
) => {
	if (state === "GET-PIVOT") {
		bars[idx1].style.backgroundColor = Colors.COLOR_PIVOT;
	} else if (state === "COMPARE") {
		bars[idx1].style.backgroundColor = Colors.COLOR_COMPARING;
	} else if (state === "GREATER") {
		bars[idx1].style.backgroundColor = Colors.COLOR_GREATER;
	} else if (state === "SWAP-1") {
		bars[idx2].style.backgroundColor = Colors.COLOR_LESSER;
	} else if (state === "SAME-INDEX-1") {
		bars[idx2].style.backgroundColor = Colors.COLOR_LESSER;
	} else if (state === "SAME-INDEX-2") {
		bars[idx2].style.backgroundColor = Colors.COLOR_PIVOT_INDEX;
		if (idx2 - 1 !== idx1) {
			bars[idx2 - 1].style.backgroundColor = Colors.COLOR_LESSER;
		}
	} else if (state === "SWAP-2") {
		bars[idx1].style.backgroundColor = Colors.COLOR_SWAP;
		bars[idx2].style.backgroundColor = Colors.COLOR_SWAP;
	} else if (state === "SWAP-3") {
		handleSwap(ref, heights, idx1, idx2);
	} else if (state === "SWAP-4") {
		if (idx1[1] - 1 !== idx1[0]) {
			bars[idx1[1] - 1].style.backgroundColor = Colors.COLOR_LESSER;
		}
		bars[idx1[1]].style.backgroundColor = Colors.COLOR_PIVOT_INDEX;
		bars[idx2].style.backgroundColor = Colors.COLOR_GREATER;
	} else if (state === "SWAP-PIVOT-1") {
		bars[idx1].style.backgroundColor = Colors.COLOR_SWAP;
		bars[idx2].style.backgroundColor = Colors.COLOR_SWAP;
	} else if (state === "SWAP-PIVOT-2") {
		handleSwap(ref, heights, idx1, idx2);
	} else if (state === "SWAP-PIVOT-3") {
		bars[idx1].style.backgroundColor = Colors.COLOR_LESSER;
		bars[idx2].style.backgroundColor = Colors.COLOR_SORTED;
	} else if (state === "NO-CHANGE") {
		bars[idx1].style.backgroundColor = Colors.COLOR_SORTED;
	} else if (state === "REVERT-BOTH") {
		for (let j = idx1[0]; j < idx2; j++) {
			if (j === idx1[1]) continue;
			bars[j].style.backgroundColor = Colors.COLOR_DEFAULT;
		}
	} else if (state === "REVERT-LEFT") {
		for (let j = idx1; j < idx2; j++) {
			bars[j].style.backgroundColor = Colors.COLOR_DEFAULT;
		}
	} else if (state === "SORTED-1") {
		bars[idx1].style.backgroundColor = Colors.COLOR_SWAP;
	} else if (state === "SORTED-2") {
		bars[idx1].style.backgroundColor = Colors.COLOR_SORTED;
	} else if (state === "ALL-SORTED") {
	}
};
