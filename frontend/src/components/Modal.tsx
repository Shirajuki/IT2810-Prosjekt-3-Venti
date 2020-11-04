import React, { useEffect, useRef, useContext, useState } from "react";
import StarRating from 'react-svg-star-rating'
import Product from "../models/product";
import Review from "../models/review"
import Items from './Items';
import { RootStoreContext } from "../stores/root-store";
import { observer, useAsObservableSource } from "mobx-react-lite"
interface IProps {
	modal: {id: string, product: Product},
	setModal: (id:string, product: Product) => void;
}
const Modal = observer(( props: IProps ) => {
	const product = useAsObservableSource(props.modal.product);
	const CTX = useContext(RootStoreContext);
	const messageRef = useRef(null);
	const nameRef = useRef(null);
	const [stars, setStars] = useState(Number);

	const post = async () => {
		if (await CTX.reviewStore.postReviews(props.modal.id, messageRef?.current?.value,  nameRef?.current?.value, stars)) {
			messageRef.current.value = "";
			nameRef.current.value = "";
			setStars(0);
			setTimeout(() => {
				document.getElementsByClassName("modalContent")[0].scrollTop = 999999;
			}, 500);
		}
	}

	useEffect(() => {
		if (!isNaN(Number(props.modal.id))) {
			CTX.reviewStore.getReviews(props.modal.id);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.modal.id]);

	return (
		<div className={`modalContainer ${props.modal.id === "none" ? "hidden" : "shown"}`}>
			<div className="modalContent">
				<div className="modalHeader">
					<div className="closeBtn" data-cy="close-button" onClick={() => props.setModal("none", null)}>
						&#10006;
					</div>
				</div>
				<Items id={props.modal.product?.id} img={product?.image_link} name={product?.name} description={product?.description} rating={Number(product?.rating)} price={product?.price} onClick={() => void(0)} type="modal"/>
				<div className="star">
					<StarRating data-cy="star-area" roundedCorner={true} isHalfRating={true}  handleOnClick={(rating:number) => {setStars(rating)}}/>
				</div>
				<div className="reviews">
					<div className="review-input">
						<textarea ref={nameRef} placeholder="Name" data-cy="name-area"></textarea>
						<textarea ref={messageRef} placeholder="Write your review here..." data-cy="review-area"></textarea>
						<button onClick={() => post()} data-cy="send-area">Send</button>
					</div>
					{CTX.reviewStore.reviews.map((review: Review) => (
						<div className="review" data-cy="view-reviews">
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
