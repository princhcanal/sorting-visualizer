import Colors, { RANDOM_COLORS } from "../colors";
import { handleSwap, handleColorChange } from "../barsManipulations";

export const shellSortManipulations = (
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
	switch (state) {
		case "COMPARING":
			// handles incremental default
			if (idx1 - 1 >= 0) {
				for (let i = idx1 - 1; i < idx2 - 1; i++) {
					handleColorChange(ref, i, Colors.COLOR_DEFAULT);
				}
			}
			// handles forward default
			let interval = idx2 - idx1;
			for (let i = idx2; i < bars.length; i++) {
				handleColorChange(ref, i, Colors.COLOR_DEFAULT);
			}
			// handles backward default
			for (
				let i = idx1 - 1 - interval, j = idx1;
				i >= 0;
				i -= interval, j -= interval
			) {
				for (let k = i; k < j; k++) {
					handleColorChange(ref, k, Colors.COLOR_DEFAULT);
				}
			}
			handleColorChange(ref, idx1, Colors.COLOR_COMPARING, idx2);
			for (let i = idx1 + 1; i < idx2; i++) {
				bars[i].style.backgroundColor = otherArgs[3];
			}
			break;
		case "SWAPPING-1":
			handleColorChange(ref, idx1, Colors.COLOR_SWAP, idx2);
			break;
		case "SWAPPING-2":
			handleSwap(ref, heights, idx1, idx2);
			break;
		case "NEW-INTERVAL":
			for (let i = idx1; i < idx2; i++) {
				handleColorChange(ref, i, Colors.COLOR_DEFAULT);
			}
			otherArgs[3] = RANDOM_COLORS[++otherArgs[2]];
			break;
		case "COLOR-SORTED":
			handleColorChange(ref, idx1, Colors.COLOR_SORTED);
			break;
		default:
			break;
	}
};
