import React, { useRef, useImperativeHandle, forwardRef } from "react";

let Dropdown = (props, ref) => {
	const dropdown = useRef();
	const options = useRef();
	const caret = useRef();
	useImperativeHandle(ref, () => ({
		children: dropdown.current.children,
		caretClassList: caret.current.classList,
		optionsClassList: options.current.classList,
	}));

	const handleDropdownClicked = () => {
		options.current.classList.toggle("collapsed");
		caret.current.classList.toggle("flip");
	};

	return (
		<div
			className="dropdown"
			ref={dropdown}
			onClick={handleDropdownClicked}
		>
			<h2>
				<span>{props.defaultValue}</span>
				<svg
					ref={caret}
					aria-hidden="true"
					focusable="false"
					data-prefix="fas"
					data-icon="caret-down"
					className="svg-inline--fa fa-caret-down fa-w-10"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 320 512"
				>
					<path
						fill="currentColor"
						d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
					></path>
				</svg>
			</h2>

			<ul className="collapsed" ref={options}>
				{props.options}
			</ul>
		</div>
	);
};

Dropdown = forwardRef(Dropdown);

export default Dropdown;
