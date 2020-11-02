import React, { useEffect, useState } from "react";
import Product from "../models/product";
import Review from "../models/review"
import Items from './Items';
interface IProps {
	modal: {id: string, product: Product},
	setModal: (id:string, product: Product) => void;
}

interface IReview {
	name: string,
	review: string,
}

function Modal( props: IProps ) {

	const [reviews, setReviews] = useState<IReview[]>([]);
	console.log(`http://localhost:8080/reviews/${props.modal.id}`);

	useEffect(() => {
        const getAPI = async () => {
            const response = await fetch(`http://localhost:8080/reviews/${props.modal.id}`,{
				method: 'GET',
				mode: 'cors',
				credentials: 'include', // Don't forget to specify this if you need cookies
			});
            const data = await response.json();
            try {
				console.log("Kattepus: ", data);
                setReviews(data);
            } catch (error) {
				console.log("HEIHEIHEI")
                console.log(error);
            }
        };
        getAPI();
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
				<div className="reviews">
					<div className="review-input">
						<textarea value="" placeholder="Write your review here..."></textarea>
						<button>Send</button>
					</div>
					{reviews !== undefined ?
						(reviews.map(review => (
							<div className="review">
							<p className="review-user">{review.name}</p>
							<p className="review-comment">{review.review}</p>
						</div>
						)))
					: null}
					{/*<div className="review">
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
						</div> */}
				</div>
			</div>
		</div>
	);
}
export default Modal;
