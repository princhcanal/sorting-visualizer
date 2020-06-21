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
		case "CURRENT-INIT":
			if (idx1 === 0 && idx2 === 0) {
				for (let i = 0; i <= 9; i++) {
					otherArgs[4][i] = otherArgs[3];
					otherArgs[3] =
						RANDOM_COLORS[++otherArgs[2] % RANDOM_COLORS.length];
				}
				otherArgs[4]["digit-ones"] = Colors.COLOR_COMPARING;
				otherArgs[4]["digit-tens"] = Colors.COLOR_PIVOT;
				otherArgs[4]["digit-hundreds"] = Colors.COLOR_LESSER;
				otherArgs[4]["digit-current"] = otherArgs[4]["digit-ones"];
			}
			handleColorChange(ref, idx1, otherArgs[4]["digit-current"]);
			break;
		case "CURRENT-COLOR":
			handleColorChange(ref, idx1, otherArgs[4][idx2[0]]);
			let nextState = animations[i + 1][2];
			if (nextState === "CURRENT-PLACE-1") {
				if (idx2[1] === 0)
					otherArgs[4]["digit-current"] = otherArgs[4]["digit-tens"];
				else if (idx2[1] === 1)
					otherArgs[4]["digit-current"] =
						otherArgs[4]["digit-hundreds"];
			}
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
