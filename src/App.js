import React from "react";
import "./App.css";

import Layout from "./hoc/Layout/Layout";
import SortingVisualizer from "./containers/SortingVisualizer/SortingVisualizer";

function App() {
	return (
		<div className="App">
			<Layout>
				<SortingVisualizer></SortingVisualizer>
			</Layout>
		</div>
	);
}

export default App;
