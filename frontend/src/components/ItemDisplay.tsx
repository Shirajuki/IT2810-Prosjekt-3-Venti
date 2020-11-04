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
		<div className="itemDisplay" >
			{props.itemList.map(item => (
				<Items data-cy="item-display-items" key={item.id} id={item.id} img={item.image_link} name={item.name} description={item.description} rating={item.rating} price={item.price} type="" onClick={() => props.setModal(item.id, item) } />
			))}
		</div>
	</>
	);
}

export default ItemDisplay;
