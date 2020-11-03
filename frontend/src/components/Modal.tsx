import React, { useEffect, useRef, useContext, useState } from "react";
import StarRating from 'react-svg-star-rating'
import Product from "../models/product";
import Review from "../models/review"
import Items from './Items';
import { RootStoreContext } from "../stores/root-store";
import { observer } from "mobx-react-lite"
interface IProps {
	modal: {id: string, product: Product},
	setModal: (id:string, product: Product) => void;
}
const Modal = observer(( props: IProps ) => {
	const CTX = useContext(RootStoreContext);
	const messageRef = useRef(null);
	const nameRef = useRef(null);
	const [stars, setStars] = useState(Number);
	
	const post = () => {
		if (CTX.reviewStore.postReviews(props.modal.id, messageRef?.current?.value,  nameRef?.current?.value, stars)) {
			messageRef.current.value = "";
			setTimeout(() => document.getElementsByClassName("modalContent")[0].scrollTo(0,document.body.scrollHeight*1000),1000);
		}
	}

	useEffect(() => {
		if (!isNaN(Number(props.modal.id))) {
			CTX.reviewStore.getReviews(props.modal.id);
		}
	}, [props.modal.id]);

	return (
		<div className={`modalContainer ${props.modal.id === "none" ? "hidden" : "shown"}`}>
			<div className="modalContent">
				<div className="modalHeader">
					<div className="closeBtn" onClick={() => props.setModal("none", null)}>
						&#10006;
					</div>
				</div>
				<Items id={props.modal.product?.id} isCarousel={false} img={props.modal.product?.image_link} name={props.modal.product?.name} description={props.modal.product?.description} price={props.modal.product?.price} onClick={() => void(0)} isModal={false}/>
				<StarRating roundedCorner={true} isHalfRating={true}  handleOnClick={(rating:number) => {setStars(rating)}}/>
				<div className="reviews">
					<div className="review-input">
						<textarea ref={nameRef} placeholder="Name"></textarea>
						<textarea ref={messageRef} placeholder="Write your review here..."></textarea>
						<button onClick={() => post()}>Send</button>
					</div>
					{CTX.reviewStore.reviews.map((review: Review) => (
						<div className="review">
							<p className="review-user">{review.name}</p>
							<StarRating size={20} initialRating={review.stars} isReadOnly={true} isHalfRating={true}/>
							<p className="review-comment">{review.reviewText}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
})
export default Modal;
