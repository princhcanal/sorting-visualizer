import Colors from "../../colors";
import { handleSwap, handleColorChange } from "../../barsManipulations";

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
	switch (state) {
		case "GET-INITIAL":
			handleColorChange(bars, idx1, Colors.COLOR_COMPARING);
			break;
		case "CHECK-MIN":
			handleColorChange(bars, idx1, Colors.COLOR_COMPARING);
			break;
		case "CHANGE-BACK":
			handleColorChange(bars, idx1, Colors.COLOR_DEFAULT);
			break;
		case "CHANGE-MIN":
			handleColorChange(bars, idx1, Colors.COLOR_PIVOT);
			if (idx2) {
				handleColorChange(bars, idx2, Colors.COLOR_DEFAULT);
			}
			break;
		case "SWAPPING-1":
			handleColorChange(bars, idx1, Colors.COLOR_SWAP, idx2);
			break;
		case "SWAPPING-2":
			handleSwap(ref, heights, idx1, idx2);
			break;
		case "SWAPPING-3":
			handleColorChange(
				bars,
				idx1,
				Colors.COLOR_SORTED,
				idx2,
				Colors.COLOR_DEFAULT
			);
			break;
		case "NO-SWAP":
			handleColorChange(bars, idx1, Colors.COLOR_SORTED);
			break;
		default:
			break;
	}
};
