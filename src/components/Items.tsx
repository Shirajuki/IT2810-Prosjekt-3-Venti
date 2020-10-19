import React, { useState, useEffect } from "react";

//Declares type of title
interface IProps {
	title: string;
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
		img: "https://vita.freetls.fastly.net/media/catalog/product/cache/1/small_image/210x/9df78eab33525d08d6e5fb8d27136e95/3/0/30788_megafix_hairspray.jpg",
		name: "Bjorn Axen",
		description: "Bjorn Axen Megafix Hairspray",
		price: "139,-",
	},
	{
		id: "1",
		img: "https://www.makeupforever.com/dw/image/v2/BCRL_PRD/on/demandware.static/-/Sites-Makeupforever_master_catalog/default/dwbb0615c6/images/I000074033/3548752171113_I000074033_MATTE-VELVET-SKIN-CONCEALER_3-3_Face_0.png?sw=400&sh=400",
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
					<div className="items">
						<img src={itemData[0].img}/>
						<p className="itemName">{itemData[0].name}</p>
						<p className="itemDescription">{itemData[0].description}</p>
						<p className="pris">{itemData[0].price}</p>
					</div>
				);
			default:
				return (
					<div className="items">
						<img src={itemData[1].img}/>
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
