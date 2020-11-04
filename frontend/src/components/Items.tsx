import React, {useContext} from "react";
import { ImBin } from "react-icons/im";
import { RootStoreContext } from "../stores/root-store";
import { observer } from "mobx-react-lite"

//Declares type of title
interface IProps {
	onClick: () => void;
	id: string;
	img: string;
	name: string;
	description: string;
	price: string;
	type: string;
}

const Items = observer((props: IProps) => {
	const CTX = useContext(RootStoreContext);
	const item = () => {
		switch (props.type) {
			case "carousel":
			return (
				<>
					<div className="items" onClick={props.onClick}>
						<div className="imgDiv">
							<img src={props.img} alt={`${props.name}`}/>
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
							<button data-cy="buy-button" onClick={() => CTX.sessionStore.addCart(+props.id)}>Add to cart</button>
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
						</div>
						<p className="itemName" data-cy="item-name">{props.name}</p>
						<p className="itemDescription">{props.description}</p>
						<p className="pris" data-cy="item-price">{props.price}</p>
					</div>
					</>
				);
		}
	};
	return item();
})

export default Items;
