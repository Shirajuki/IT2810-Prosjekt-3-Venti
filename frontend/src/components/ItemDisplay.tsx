import React, {useContext} from "react";
import Product from "../models/product";
import Items from './Items';
import HeroContext  from "../contexts/hero-context";
import { observer, useLocalObservable, useAsObservableSource } from "mobx-react-lite"
import {RootStoreContext} from "../stores/root-store";

interface IProps {
	setModal: (id:string, product: Product) => void;
	itemList: Product[];
}


const ItemDisplay = observer((props: IProps) => {
	const CTX = useContext(RootStoreContext);
	return (
		<>
		<span>{CTX.heroStore.totalHeroes}</span>
		<div className="itemDisplay">
			{props.itemList.map(item => (
				<Items id={item.id} img={item.image_link} name={item.name} description={item.description} price={item.price} isCarousel={false} onClick={() => props.setModal(item.id, item) }isModal = {true} />
			))}
		</div>
	</>
	);
})

export default ItemDisplay;
