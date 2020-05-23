import React from "react";

import classes from "./Layout.module.css";

const Layout = (props) => {
	return (
		<div className={classes.Layout}>
			<header>
				<h1>Sorting Visualizer</h1>
			</header>
			<main className={classes.Content}>{props.children}</main>
		</div>
	);
};

export default Layout;
