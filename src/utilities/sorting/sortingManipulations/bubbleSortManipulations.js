import Colors from "../../colors";
import { handleSwap, handleColorChange } from "../../barsManipulations";

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
	switch (state) {
		case "COMPARING":
			handleColorChange(bars, idx1, Colors.COLOR_COMPARING, idx2);

			if (idx1 !== 0) {
				handleColorChange(bars, idx1 - 1, Colors.COLOR_DEFAULT);
			}

			break;
		case "SWAPPING-1":
			handleColorChange(bars, idx1, Colors.COLOR_SWAP, idx2);
			break;
		case "SWAPPING-2":
			handleSwap(ref, heights, idx1, idx2);
			break;
		case "LAST-SORTED":
			if (animations[i + 1][2] === "NO-SWAPS") {
				if (idx1 >= 0)
					handleColorChange(bars, idx1, Colors.COLOR_DEFAULT);

				handleColorChange(bars, idx2, Colors.COLOR_DEFAULT);
			} else {
				handleColorChange(bars, idx2, Colors.COLOR_SORTED);

				if (idx1 >= 0)
					handleColorChange(bars, idx1, Colors.COLOR_DEFAULT);
			}
			break;
		case "NO-SWAPS":
			handleColorChange(bars, idx1, Colors.COLOR_SORTED);
			break;
		default:
			break;
	}
};
