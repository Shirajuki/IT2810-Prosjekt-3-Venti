import React, { ReactNode, useContext } from "react";
import StarRating from 'react-svg-star-rating'
import { ImBin } from "react-icons/im";
import { RootStoreContext } from "../stores/root-store";
import { observer, useAsObservableSource } from "mobx-react-lite"
import Swal from 'sweetalert2'

//Declares type of title
interface IProps {
	onClick: () => void;
	id: string;
	img: string;
	name: string;
	description: string;
	rating: number;
	price: string;
	type: string;
}
const starElements: ReactNode[] = []
for (let i = 0; i <= 5; i+= 0.5) {
	starElements.push(<StarRating size={20} initialRating={i} isReadOnly={true} isHalfRating={true}/>)
}
const Items = observer((props: IProps) => {
	const CTX = useContext(RootStoreContext);
	const product = useAsObservableSource(props);
	const stars = Number(props.rating);

	switch (props.type) {
		case "carousel":
		return (
			<>
				<div className="items" onClick={props.onClick}>
					<div className="imgDiv">
						<img src={props.img} alt={`${product.name}`}/>
						{Number(stars)*2 === 0 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 1 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 2 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 3 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 4 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 5 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 6 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 7 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 8 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 9 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 10 ? starElements[Number(stars)*2] : null}
					</div>
					<p className="itemName">{props.name}</p>
					<p className="pris">{props.price}</p>
					<p className="quickView">Quick View</p>
				</div>
			</>
		);
		case "modal":
		return (
			<>
				<div className="items-modal" onClick={props.onClick}>
					<div className="imgDiv">
						<img className="modal-image" src={props.img} alt={`${props.name}`}/>
					</div>
					<div className="info-container">
						<p className="itemName">{props.name}</p>
						<p className="pris">{props.price}</p>
						{Number(stars)*2 === 0 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 1 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 2 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 3 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 4 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 5 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 6 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 7 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 8 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 9 ? starElements[Number(stars)*2] : null}
						{Number(stars)*2 === 10 ? starElements[Number(stars)*2] : null}
						<button onClick={() => {
							CTX.sessionStore.addCart(+props.id);
							Swal.fire(
								'Added to cart!',
								'The producr was added to cart!',
								'success');
						}}>Add to cart</button>
						<p className="itemDescription">{props.description}</p>
					</div>
				</div>
			</>
		);
		case "cart":
		return (
			<>
				<div className="item">
					<div className="imgDiv">
						<img src={props.img} alt={props.name}/>
					</div>
					<div className="info">
						<p className="itemName">{props.name}</p>
						<div className="itemAdd">
							<button onClick={() => CTX.sessionStore.editCart(Number(props.id), false)}>-</button>
							<span>{CTX.sessionStore.productCount(Number(props.id))}</span>
							<button onClick={() => CTX.sessionStore.editCart(Number(props.id), true)}>+</button>
						</div>
					</div>
					<div>
						<ImBin data-cy="remove-button" onClick={() => CTX.sessionStore.removeCart(Number(props.id))}/>
						<p className="pris">{props.price}</p>
					</div>
				</div>
			</>
		);
		default:
		return (
			<>
				<div className="items" onClick={props.onClick}>
					<div className="imgDiv">
						<img src={props.img} alt={`${props.name}`}/>
						<StarRating size={15} initialRating={stars} isReadOnly={true} isHalfRating={true}/>
					</div>
					<p className="itemName" data-cy="item-name">{props.name}</p>
					<p className="itemDescription">{props.description}</p>
					<div>
						<p className="pris" data-cy="item-price">{props.price}</p>
					</div>
				</div>
			</>
		);
	}
})

export default Items;
