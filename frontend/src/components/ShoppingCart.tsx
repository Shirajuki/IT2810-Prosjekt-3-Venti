import React, { useEffect, useContext } from "react";
import Product from "../models/product";
import Items from './Items';
import { RootStoreContext } from "../stores/root-store";
import { observer } from "mobx-react-lite"
interface IProps {
	modal: {id: string, product: Product},
	setModal: (id:string, product: Product) => void;
}
const ShoppingCart = observer(() => {
	const CTX = useContext(RootStoreContext);

	useEffect(() => {

	}, []);

	return (
		<div className={`shoppingCart ${true ? "active" : "inactive"}`}>
			<div className="cartTitle">
				<h2>[kurv] Handlekurv</h2>
				<span className="cartExit">X</span>
			</div>
			<div className="cartItems">
			</div>
			<div className="cartInfo">
				<p>Total 0,-</p>
				<button>BUYBUYBUY</button>
			</div>
		</div>
	);
})
export default ShoppingCart;
