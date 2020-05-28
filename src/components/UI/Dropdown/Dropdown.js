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
				<i className="fas fa-caret-down" ref={caret}></i>
			</h2>

			<ul className="collapsed" ref={options}>
				{props.options}
			</ul>
		</div>
	);
};

Dropdown = forwardRef(Dropdown);

export default Dropdown;
