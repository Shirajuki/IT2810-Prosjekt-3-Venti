import React from "react";

//Declares type of title
interface IProps {
	onClick: () => void;
	id: string;
	img: string;
	name: string;
	description: string;
	price: string;
}


function Items(props: IProps) {
	const item = () => {
		switch (props.name) {
			default:
				return (
					<div className="items" onClick={props.onClick}>
						<img src={props.img} alt={`${props.name}`}/>
						<p className="itemName">{props.name}</p>
						<p className="itemDescription">{props.description}</p>
						<p className="pris">{props.price}</p>
					</div>
				);
		}
	};
	return item();
}

export default Items;
