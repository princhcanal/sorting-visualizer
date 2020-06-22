import Colors, { RANDOM_COLORS } from "../../colors";
import { handleSwap, handleColorChange } from "../../barsManipulations";

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
		case "COLOR-LEVEL":
			if (idx1 === 0) {
				for (let i = 0; i <= idx2[idx2.length - 1]; i++) {
					otherArgs.obj[i] = otherArgs.color;
					otherArgs.color =
						RANDOM_COLORS[++otherArgs.count % RANDOM_COLORS.length];
				}
			}

			handleColorChange(bars, idx1, otherArgs.obj[idx2[idx1]]);
			break;
		case "SUB-HEAP":
			otherArgs.prevColor1 = bars[idx1].style.backgroundColor;
			handleColorChange(bars, idx1, Colors.COLOR_PIVOT);

			if (bars[idx2[0]] && bars[idx2[1]]) {
				otherArgs.prevColor2 = bars[idx2[0]].style.backgroundColor;
				handleColorChange(
					bars,
					idx2[0],
					Colors.COLOR_PIVOT_INDEX,
					idx2[1]
				);
			} else if (bars[idx2[0]]) {
				otherArgs.prevColor2 = bars[idx2[0]].style.backgroundColor;
				handleColorChange(bars, idx2[0], Colors.COLOR_PIVOT_INDEX);
			}
			break;
		case "LARGEST-1":
			handleColorChange(bars, idx1, Colors.COLOR_GREATER);
			break;
		case "LARGEST-2":
			handleColorChange(bars, idx1, otherArgs.prevColor1);

			if (bars[idx2[0]] && bars[idx2[1]]) {
				handleColorChange(bars, idx2[0], otherArgs.prevColor2, idx2[1]);
			} else if (bars[idx2[0]]) {
				handleColorChange(bars, idx2[0], otherArgs.prevColor2);
			}
			break;
		case "ROOT-TO-LAST":
			otherArgs.prevColor1 = bars[idx1].style.backgroundColor;
			otherArgs.prevColor2 = bars[idx2].style.backgroundColor;

			handleColorChange(bars, idx1, Colors.COLOR_COMPARING, idx2);
			break;
		case "SWAPPING-1":
			handleColorChange(bars, idx1, Colors.COLOR_SWAP, idx2);
			break;
		case "SWAPPING-2":
			handleSwap(ref, heights, idx1, idx2);
			break;
		case "SWAPPING-3":
			handleColorChange(bars, idx1, otherArgs.prevColor1);

			if (bars[idx2[0]] && bars[idx2[1]]) {
				handleColorChange(bars, idx2[0], otherArgs.prevColor2, idx2[1]);
			} else if (bars[idx2[0]]) {
				handleColorChange(bars, idx2[0], otherArgs.prevColor2);
			}
			break;
		case "LAST-SORTED":
			handleColorChange(
				bars,
				idx1,
				otherArgs.prevColor1,
				idx2,
				Colors.COLOR_SORTED
			);
			break;
		case "FIRST-SORTED":
			handleColorChange(bars, idx1, Colors.COLOR_SORTED);
			break;
		default:
			break;
	}
};
