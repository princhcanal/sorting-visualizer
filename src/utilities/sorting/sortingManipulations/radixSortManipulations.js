import Colors, { RANDOM_COLORS } from "../../colors";
import { handleSwap, handleColorChange } from "../../barsManipulations";

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
					otherArgs.obj[i] = otherArgs.color;
					otherArgs.color =
						RANDOM_COLORS[++otherArgs.count % RANDOM_COLORS.length];
				}

				otherArgs.obj["digit-ones"] = Colors.COLOR_COMPARING;
				otherArgs.obj["digit-tens"] = Colors.COLOR_PIVOT;
				otherArgs.obj["digit-hundreds"] = Colors.COLOR_LESSER;
				otherArgs.obj["digit-current"] = otherArgs.obj["digit-ones"];
			}

			handleColorChange(bars, idx1, otherArgs.obj["digit-current"]);
			break;
		case "CURRENT-COLOR":
			handleColorChange(bars, idx1, otherArgs.obj[idx2[0]]);

			let nextState = animations[i + 1][2];
			if (nextState === "CURRENT-PLACE-1") {
				if (idx2[1] === 0)
					otherArgs.obj["digit-current"] =
						otherArgs.obj["digit-tens"];
				else if (idx2[1] === 1)
					otherArgs.obj["digit-current"] =
						otherArgs.obj["digit-hundreds"];
			}
			break;
		case "CURRENT-PLACE-1":
			otherArgs.prevColor1 = bars[idx1].style.backgroundColor;
			otherArgs.prevColor2 = bars[idx2].style.backgroundColor;

			handleColorChange(bars, idx1, Colors.COLOR_SWAP, idx2);
			break;
		case "CURRENT-PLACE-2":
			handleSwap(ref, heights, idx1, idx2);
			break;
		case "CURRENT-PLACE-3":
			handleColorChange(
				bars,
				idx1,
				otherArgs.prevColor2,
				idx2,
				otherArgs.prevColor1
			);
			break;
		case "COLOR-SORTED":
			handleColorChange(bars, idx1, Colors.COLOR_SORTED);
			break;
		default:
			break;
	}
};
