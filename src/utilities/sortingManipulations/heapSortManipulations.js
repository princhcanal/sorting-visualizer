import Colors, { RANDOM_COLORS } from "../colors";
import { handleSwap, handleColorChange } from "../barsManipulations";

export const heapSortManipulations = (
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
		case "GET-LEVELS":
			for (let i = 0; i <= idx1[idx1.length - 1]; i++) {
				otherArgs[4][i] = otherArgs[3];
				otherArgs[3] = RANDOM_COLORS[++otherArgs[2]];
			}
			break;
		case "COLOR-LEVEL":
			handleColorChange(ref, idx1, otherArgs[4][idx2]);
			break;
		case "SUB-HEAP":
			otherArgs[0] = bars[idx1].style.backgroundColor;
			handleColorChange(ref, idx1, Colors.COLOR_PIVOT);
			if (bars[idx2[0]] && bars[idx2[1]]) {
				otherArgs[1] = bars[idx2[0]].style.backgroundColor;
				handleColorChange(
					ref,
					idx2[0],
					Colors.COLOR_PIVOT_INDEX,
					idx2[1]
				);
			} else if (bars[idx2[0]]) {
				otherArgs[1] = bars[idx2[0]].style.backgroundColor;
				handleColorChange(ref, idx2[0], Colors.COLOR_PIVOT_INDEX);
			}
			break;
		case "LARGEST-1":
			handleColorChange(ref, idx1, Colors.COLOR_GREATER);
			break;
		case "LARGEST-2":
			handleColorChange(ref, idx1, otherArgs[0]);
			if (bars[idx2[0]] && bars[idx2[1]]) {
				handleColorChange(ref, idx2[0], otherArgs[1], idx2[1]);
			} else if (bars[idx2[0]]) {
				handleColorChange(ref, idx2[0], otherArgs[1]);
			}
			break;
		case "ROOT-TO-LAST":
			otherArgs[0] = bars[idx1].style.backgroundColor;
			otherArgs[1] = bars[idx2].style.backgroundColor;
			handleColorChange(ref, idx1, Colors.COLOR_COMPARING, idx2);
			break;
		case "SWAPPING-1":
			handleColorChange(ref, idx1, Colors.COLOR_SWAP, idx2);
			break;
		case "SWAPPING-2":
			handleSwap(ref, heights, idx1, idx2);
			break;
		case "SWAPPING-3":
			handleColorChange(ref, idx1, otherArgs[0]);
			if (bars[idx2[0]] && bars[idx2[1]]) {
				handleColorChange(ref, idx2[0], otherArgs[1], idx2[1]);
			} else if (bars[idx2[0]]) {
				handleColorChange(ref, idx2[0], otherArgs[1]);
			}
			break;
		case "LAST-SORTED":
			handleColorChange(
				ref,
				idx1,
				otherArgs[0],
				idx2,
				Colors.COLOR_SORTED
			);
			break;
		case "FIRST-SORTED":
			handleColorChange(ref, idx1, Colors.COLOR_SORTED);
			break;
		case "ALL-SORTED":
			break;
		default:
			break;
	}
};
