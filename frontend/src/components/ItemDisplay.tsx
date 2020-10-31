import React from "react";
import Product from "../models/product";
import Items from './Items';

interface IProps {
	setModal: (id:string, product: Product) => void;
	itemList: Product[];
}


const ItemDisplay = (props: IProps) => {
	return (
		<>
		<div className="itemDisplay">
			{props.itemList.map(item => (
				<Items id={item.id} img={item.image_link} name={item.name} description={item.description} price={item.price} isCarousel={false} onClick={() => props.setModal(item.id, item) }isModal = {true} />
			))}
		</div>
	</>
	);
}

export default ItemDisplay;
