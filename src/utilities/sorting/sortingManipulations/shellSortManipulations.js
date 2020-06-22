import Colors, { RANDOM_COLORS } from "../../colors";
import { handleSwap, handleColorChange } from "../../barsManipulations";

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
				handleColorChange(
					bars,
					idx1 - 1,
					Colors.COLOR_DEFAULT,
					idx2,
					null,
					true
				);
			}

			// handles forward default
			handleColorChange(
				bars,
				idx2,
				Colors.COLOR_DEFAULT,
				bars.length,
				null,
				true
			);

			// handles backward default
			let interval = idx2 - idx1;
			for (
				let i = idx1 - 1 - interval, j = idx1;
				i >= 0;
				i -= interval, j -= interval
			) {
				handleColorChange(bars, i, Colors.COLOR_DEFAULT, j, null, true);
			}

			handleColorChange(bars, idx1, Colors.COLOR_COMPARING, idx2);

			handleColorChange(
				bars,
				idx1 + 1,
				otherArgs.color,
				idx2,
				null,
				true
			);
			break;
		case "SWAPPING-1":
			handleColorChange(bars, idx1, Colors.COLOR_SWAP, idx2);
			break;
		case "SWAPPING-2":
			handleSwap(ref, heights, idx1, idx2);
			break;
		case "NEW-INTERVAL":
			handleColorChange(
				bars,
				idx1,
				Colors.COLOR_DEFAULT,
				idx2,
				null,
				true
			);

			otherArgs.color = RANDOM_COLORS[++otherArgs.count];
			break;
		case "COLOR-SORTED":
			handleColorChange(bars, idx1, Colors.COLOR_SORTED);
			break;
		default:
			break;
	}
};
