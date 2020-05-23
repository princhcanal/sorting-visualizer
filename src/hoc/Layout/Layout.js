import React from "react";

import classes from "./Layout.module.css";

const Layout = (props) => {
	return (
		<>
			<header className={classes.Header}></header>
			<main className={classes.Content}>{props.children}</main>
		</>
	);
};

export default Layout;
