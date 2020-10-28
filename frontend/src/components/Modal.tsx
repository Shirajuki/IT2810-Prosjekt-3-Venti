import React from "react";
import Product from "../models/product";
import Items from './Items';
interface IProps {
	modal: {id: string, product: Product},
	setModal: (id:string, product: Product) => void;
}
function Modal( props: IProps ) {

	return (
		<div
			className={`modalContainer ${props.modal.id === "none" ? "hidden" : "shown"}`}
		>
			<div className="modalContent">
				<div className="modalHeader">
					<div className="closeBtn" onClick={() => props.setModal("none", null)}>
						&#10006;
					</div>
				</div>
				<Items id={props.modal.product?.id} isCarousel={false} img={props.modal.product?.image_link} name={props.modal.product?.name} description={props.modal.product?.description} price={props.modal.product?.price} onClick={() => void(0)} isModal={false}/>
			</div>
		</div>
	);
}
export default Modal;

