import Colors, { RANDOM_COLORS } from "../colors";
import { handleSwap, handleColorChange } from "../barsManipulations";

export const radixSortManipulations = (
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
		case "GET-DIGIT-COLORS":
			for (let i = 0; i <= 9; i++) {
				otherArgs[4][i] = otherArgs[3];
				otherArgs[3] =
					RANDOM_COLORS[++otherArgs[2] % RANDOM_COLORS.length];
			}
			console.log(otherArgs[4]);
			break;
		case "CURRENT-INIT":
			handleColorChange(ref, idx1, Colors.COLOR_COMPARING);
			break;
		case "CURRENT-COLOR":
			handleColorChange(ref, idx1, otherArgs[4][idx2]);
			break;
		case "CURRENT-PLACE-1":
			otherArgs[0] = bars[idx1].style.backgroundColor;
			otherArgs[1] = bars[idx2].style.backgroundColor;
			handleColorChange(ref, idx1, Colors.COLOR_SWAP, idx2);
			break;
		case "CURRENT-PLACE-2":
			handleSwap(ref, heights, idx1, idx2);
			break;
		case "CURRENT-PLACE-3":
			handleColorChange(ref, idx1, otherArgs[1], idx2, otherArgs[0]);
			break;
		case "COLOR-SORTED":
			handleColorChange(ref, idx1, Colors.COLOR_SORTED);
			break;
		default:
			break;
	}
};
