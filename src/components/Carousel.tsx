import React, { useState, useEffect } from "react";
import Items from './Items';
//Declares type of title
interface IProps {
	title: string;
}

/*Function that fetches a poem based of it's title from the 
  poetrydb database and displays it's lines*/

function Carousel() {
	const [data, setData] = useState([]);

	useEffect(() => {
	}, []);

	return (
	<>
		<div className="carousel">
			<a className="prev">pr</a>
			<a className="next">ne</a>
			<Items title="newest" />
			<Items title="newest" />
			<Items title="newest" />
			<Items title="newest" />
			<Items title="newest" />
		</div>
	</>
	);
}

export default Carousel;
