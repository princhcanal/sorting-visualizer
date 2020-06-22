import Colors from "../../colors";
import { handleSwap, handleColorChange } from "../../barsManipulations";

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
	switch (state) {
		case "GET-PIVOT":
			handleColorChange(bars, idx1, Colors.COLOR_PIVOT);
			break;
		case "COMPARE":
			handleColorChange(bars, idx1, Colors.COLOR_COMPARING);
			break;
		case "GREATER":
			handleColorChange(bars, idx1, Colors.COLOR_GREATER);
			break;
		case "SWAPPING-1":
			handleColorChange(bars, idx2, Colors.COLOR_LESSER);
			break;
		case "SAME-INDEX-1":
			handleColorChange(bars, idx2, Colors.COLOR_LESSER);
			break;
		case "SAME-INDEX-2":
			handleColorChange(bars, idx2, Colors.COLOR_PIVOT_INDEX);

			if (idx2 - 1 !== idx1) {
				handleColorChange(bars, idx2 - 1, Colors.COLOR_LESSER);
			}
			break;
		case "SWAPPING-2":
			handleColorChange(bars, idx1, Colors.COLOR_SWAP, idx2);
			break;
		case "SWAPPING-3":
			handleSwap(ref, heights, idx1, idx2);
			break;
		case "SWAPPING-4":
			if (idx1[1] - 1 !== idx1[0]) {
				handleColorChange(bars, idx1[1] - 1, Colors.COLOR_LESSER);
			}

			handleColorChange(
				bars,
				idx1[1],
				Colors.COLOR_PIVOT_INDEX,
				idx2,
				Colors.COLOR_GREATER
			);
			break;
		case "SWAP-PIVOT-1":
			handleColorChange(bars, idx1, Colors.COLOR_SWAP, idx2);
			break;
		case "SWAP-PIVOT-2":
			handleSwap(ref, heights, idx1, idx2);
			break;
		case "SWAP-PIVOT-3":
			handleColorChange(
				bars,
				idx1,
				Colors.COLOR_LESSER,
				idx2,
				Colors.COLOR_SORTED
			);
			break;
		case "NO-CHANGE":
			handleColorChange(bars, idx1, Colors.COLOR_SORTED);
			break;
		case "REVERT-BOTH":
			for (let j = idx1[0]; j < idx2; j++) {
				if (j === idx1[1]) continue;
				handleColorChange(bars, j, Colors.COLOR_DEFAULT);
			}
			break;
		case "REVERT-LEFT":
			handleColorChange(
				bars,
				idx1,
				Colors.COLOR_DEFAULT,
				idx2,
				null,
				true
			);
			break;
		case "SORTED-1":
			handleColorChange(bars, idx1, Colors.COLOR_SWAP);
			break;
		case "SORTED-2":
			handleColorChange(bars, idx1, Colors.COLOR_SORTED);
			break;
		default:
			break;
	}
};
