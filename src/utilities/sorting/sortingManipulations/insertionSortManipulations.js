import Colors from "../../colors";
import { handleSwap, handleColorChange } from "../../barsManipulations";

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
	switch (state) {
		case "START":
			if (idx1 >= 0) handleColorChange(bars, idx1, Colors.COLOR_DEFAULT);

			handleColorChange(bars, idx2, Colors.COLOR_COMPARING);
			break;
		case "SWAPPING-1":
			handleColorChange(bars, idx1, Colors.COLOR_COMPARING);
			break;
		case "SWAPPING-2":
			handleColorChange(bars, idx1, Colors.COLOR_SWAP, idx2);
			break;
		case "SWAPPING-3":
			handleSwap(ref, heights, idx1, idx2);
			break;
		case "SWAPPING-4":
			handleColorChange(bars, idx1, Colors.COLOR_COMPARING);
			handleColorChange(bars, idx2, Colors.COLOR_DEFAULT);
			break;
		case "DONE-1":
			handleColorChange(bars, idx1, Colors.COLOR_COMPARING);
			break;
		case "DONE-2":
			if (idx1 >= 0) handleColorChange(bars, idx1, Colors.COLOR_DEFAULT);
			handleColorChange(bars, idx2, Colors.COLOR_LESSER);
			break;
		case "DONE-3":
			handleColorChange(bars, idx2, Colors.COLOR_DEFAULT);
			break;
		case "SORTED":
			handleColorChange(bars, idx2, Colors.COLOR_DEFAULT);
			break;
		case "COLOR-SORTED":
			handleColorChange(bars, idx1, Colors.COLOR_SORTED);
			break;
		default:
			break;
	}
};
