import React from "react";

//Declares type of title
interface IProps {
	title: string;
	onClick: () => void;
}
type ItemType = {
	id: string,
	img: string,
	name: string,
	description: string,
	price: string;

}
const itemData: ItemType[] = [
	{
		id: "0",
		img: "img1.jpg",
		name: "Bjorn Axen",
		description: "Bjorn Axen Megafix Hairspray",
		price: "139,-",
	},
	{
		id: "1",
		img: "img2.png",
		name: "FENTY BEAUTY by Rihanna",
		description: "Gloss Bomb Universal Lip Luminizer",
		price: "190,-",
	},
];
function Items(props: IProps) {
	const item = () => {
		switch (props.title) {
			case "newest":
				return (
					<div className="items" onClick={props.onClick}>
						<img src={itemData[0].img} alt={`${itemData[0].name}`}/>
						<p className="itemName">{itemData[0].name}</p>
						<p className="itemDescription">{itemData[0].description}</p>
						<p className="pris">{itemData[0].price}</p>
					</div>
				);
			default:
				return (
					<div className="items" onClick={props.onClick}>
						<img src={itemData[1].img} alt={`${itemData[1].name}`}/>
						<p className="itemName">{itemData[1].name}</p>
						<p className="itemDescription">{itemData[1].description}</p>
						<p className="pris">{itemData[1].price}</p>
					</div>
				);
		}
	};
	return item();
}

export default Items;
