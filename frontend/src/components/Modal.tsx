import React from "react";
import Product from "../models/product";
import Items from './Items';
interface IProps {
	modal: {id: string, product: Product},
	setModal: (id:string, product: Product) => void;
}
function Modal( props: IProps ) {

	return (
		<div className={`modalContainer ${props.modal.id === "none" ? "hidden" : "shown"}`}>
			<div className="modalContent">
				<div className="modalHeader">
					<div className="closeBtn" onClick={() => props.setModal("none", null)}>
						&#10006;
					</div>
				</div>
				<Items id={props.modal.product?.id} isCarousel={false} img={props.modal.product?.image_link} name={props.modal.product?.name} description={props.modal.product?.description} price={props.modal.product?.price} onClick={() => void(0)} isModal={false}/>
				<div className="reviews">
					<div className="review-input">
						<textarea value="" placeholder="Write your review here..."></textarea>
						<button>Send</button>
					</div>
					<div className="review">
						<p className="review-user">Anonymous Bob</p>
						<p className="stars">🟊🟊🟊🟊☆</p>
						<p className="review-comment">Very good product I rate 4/5 stars!</p>
					</div>
					<div className="review">
						<p className="review-user">Anonymous Candy</p>
						<p className="stars">🟊🟊🟊🟊☆</p>
						<p className="review-comment">Very good product I rate 4/5 stars!</p>
					</div>
					<div className="review">
						<p className="review-user">Anonymous Doggo</p>
						<p className="stars">🟊🟊🟊🟊☆</p>
						<p className="review-comment">Very good product I rate 4/5 stars!</p>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Modal;
