import React, { useState, useEffect } from "react";
import Items from './Items';
//Declares type of title
interface IProps {
	title: string;
}

function ItemDisplay() {
	return (
	<>
		<div className="itemDisplay">
			<Items title="" />
			<Items title="" />
			<Items title="" />
			<Items title="" />
			<Items title="" />
			<Items title="" />
			<Items title="" />
		</div>
	</>
	);
}

export default ItemDisplay;
