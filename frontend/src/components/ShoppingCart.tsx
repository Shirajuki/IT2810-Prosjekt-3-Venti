import React, { useEffect, useContext, useState } from "react";
import Product from "../models/product";
import Items from './Items';
import { TiShoppingCart } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { RootStoreContext } from "../stores/root-store";
import { observer } from "mobx-react-lite"
import Popup from 'reactjs-popup';

interface IProps {
	setModal: (id:string, product: Product) => void;
}
const ShoppingCart = observer((props: IProps) => {
	const CTX = useContext(RootStoreContext);
	const [done, setDone] = useState(false);

	useEffect(() => {

	}, []);

	function clearCart() {
		CTX.sessionStore.cartProduct.map((item: Product) => {
			CTX.sessionStore.removeCart(Number(item.id))
			setDone(true);
		})
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
					return (<Items id={item.id} img={item.image_link} name={item.name} description={item.description} price={item.price} type="cart" onClick={() => props.setModal(item.id, item)} />);
				})}
			</div>
			<div className="cartInfo">
				<p>Total: {CTX.sessionStore.cartTotalPrice}$</p>
				<Popup
    trigger={<button onClick={() => clearCart()} data-cy="purchase-button">BUYBUYBUY</button>}
    modal
    nested
  >
	  {/*done ? CTX.sessionStore.setCartActive(false): null*/}
      <div className="modal">
        <div className="header"> Modal Title </div>
        <div className="content">
          {' '}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
          Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
          delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
          <br />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
          commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
          explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
        </div>
        <div className="actions">
          <Popup
            trigger={<button className="button"> Trigger </button>}
            position="top center"
            nested
          >
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              magni omnis delectus nemo, maxime molestiae dolorem numquam
              mollitia, voluptate ea, accusamus excepturi deleniti ratione
              sapiente! Laudantium, aperiam doloribus. Odit, aut.
            </span>
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
            }}
          >
            close modal
          </button>
        </div>
      </div>
    
  </Popup>

				<Popup
            trigger={<button onClick={() => clearCart()} data-cy="purchase-button">BUYBUYBUY</button>}
            position="top center"
            nested
          >
			  <p>Thank you for buying our products</p>
		  </Popup>
			</div>
			</div>
	);
})
export default ShoppingCart;
