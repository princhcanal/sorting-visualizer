import Colors, { RANDOM_COLORS } from "../../colors";
import { handleColorChange } from "../../barsManipulations";

export const mergeSortManipulations = (
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
		case "MERGING-1":
			otherArgs.prevColor1 = bars[idx1[0]].style.backgroundColor;
			otherArgs.prevColor2 = bars[idx2[1]].style.backgroundColor;

			handleColorChange(
				bars,
				idx1[0],
				Colors.COLOR_SUBARRAY_1,
				idx1[1] + 1,
				null,
				true
			);
			handleColorChange(
				bars,
				idx2[0],
				Colors.COLOR_SUBARRAY_2,
				idx2[1] + 1,
				null,
				true
			);
			break;
		case "MERGING-1-LAST":
			otherArgs.prevColor1 = bars[idx1[0]].style.backgroundColor;
			otherArgs.prevColor2 = bars[idx2[1]].style.backgroundColor;

			handleColorChange(
				bars,
				idx1[0],
				Colors.COLOR_SUBARRAY_1,
				idx1[1] + 1,
				null,
				true
			);
			handleColorChange(
				bars,
				idx2[0],
				Colors.COLOR_SUBARRAY_2,
				idx2[1] + 1,
				null,
				true
			);
			break;
		case "MERGING-2":
			handleColorChange(
				bars,
				idx1[0],
				otherArgs.prevColor1,
				idx1[1] + 1,
				null,
				true
			);
			handleColorChange(
				bars,
				idx2[0],
				otherArgs.prevColor2,
				idx2[1] + 1,
				null,
				true
			);
			break;
		case "COMPARING":
			handleColorChange(bars, idx1, Colors.COLOR_COMPARING, idx2);
			break;
		case "CASE-LEFT":
			handleColorChange(
				bars,
				idx1,
				otherArgs.color,
				idx2,
				otherArgs.prevColor2
			);
			break;
		case "CASE-RIGHT-INIT":
			handleColorChange(bars, idx1, Colors.COLOR_SWAP, idx2);
			break;
		case "CASE-RIGHT-SHIFT":
			let temp = bars[idx2].style.height;

			for (let g = idx2; g > idx1; g--) {
				bars[g].style.height = bars[g - 1].style.height;
				if (heights.length <= 20) {
					bars[g].children[0].innerHTML = bars[g].style.height.slice(
						0,
						temp.indexOf("px")
					);
				}
			}

			bars[idx1].style.height = temp;
			if (heights.length <= 20)
				bars[idx1].children[0].innerHTML = bars[
					idx1
				].style.height.slice(0, temp.indexOf("px"));

			handleColorChange(
				bars,
				idx2,
				otherArgs.prevColor1,
				idx1 + 1,
				Colors.COLOR_SWAP
			);
			break;
		case "CASE-RIGHT-REVERT":
			handleColorChange(
				bars,
				idx1,
				otherArgs.color,
				idx2,
				otherArgs.prevColor1
			);
			break;
		case "ONE-SIDE":
			handleColorChange(bars, idx1, otherArgs.color);

			let nextState;
			if (animations[i + 1]) nextState = animations[i + 1][2];
			if (nextState === "MERGING-1") {
				otherArgs.color =
					RANDOM_COLORS[++otherArgs.count % RANDOM_COLORS.length];
			} else if (nextState === "MERGING-1-LAST") {
				otherArgs.color = Colors.COLOR_SORTED;
			}
			break;
		default:
			break;
	}
};
