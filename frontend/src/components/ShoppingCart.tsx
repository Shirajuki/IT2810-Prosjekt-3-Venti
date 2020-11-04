import React, { useContext } from "react";
import Product from "../models/product";
import Items from './Items';
import { TiShoppingCart } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { RootStoreContext } from "../stores/root-store";
import { observer } from "mobx-react-lite"
import Swal from 'sweetalert2'

interface IProps {
	setModal: (id:string, product: Product) => void;
}
const ShoppingCart = observer((props: IProps) => {
	const CTX = useContext(RootStoreContext);

	const clearCart = () => {
		Swal.fire(
			'Bought!',
			'Thank you for the purchase!',
			'success')
		CTX.sessionStore.cartProduct.forEach((item: Product) => {
			CTX.sessionStore.removeCart(Number(item.id))
		})
		CTX.sessionStore.setCartActive(false);
	}

	return (
		<div className={`shoppingCart ${ CTX.sessionStore.cartActive ? "active" : "inactive"}`}>
			<div className="cartTitle">
				<h2><TiShoppingCart/> Handlekurv</h2>
				<ImCross className="cartExit" onClick={() => {
					CTX.sessionStore.setCartActive(false);
					CTX.sessionStore.updateCart();
				}}>X</ImCross>
			</div>
			<div className="cartItems">
				{ CTX.sessionStore.cartProduct.map((item: Product) => {
					return (<Items id={item.id} img={item.image_link} name={item.name} description={item.description} rating={item.rating} price={item.price} type="cart" onClick={() => props.setModal(item.id, item)} />);
				})}
			</div>
			<div className="cartInfo">
				<p>Total: {CTX.sessionStore.cartTotalPrice}$</p>
				<button onClick={() => clearCart()} data-cy="purchase-button">BUYBUYBUY</button>
			</div>
		</div>
	);
})
export default ShoppingCart;
