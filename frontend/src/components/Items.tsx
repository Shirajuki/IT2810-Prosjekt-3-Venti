import React from "react";

//Declares type of title
interface IProps {
	onClick: () => void;
	id: string;
	img: string;
	name: string;
	description: string;
	price: string;
	isModal: boolean;
}


function Items(props: IProps) {
	const item = () => {
		switch (props.name) {
			default:
				return (
					<>
					{props.isModal ? 
					<div className="items" onClick={props.onClick}>
						<img src={props.img} alt={`${props.name}`}/>
						<p className="itemName">{props.name}</p>
						<p className="itemDescription">{props.description}</p>
						<p className="pris">{props.price}</p>
					</div>
					:
					<div className="items-modal" onClick={props.onClick}>
						<img className="modal-image" src={props.img} alt={`${props.name}`}/>
						<div className="info-container">
							<p className="itemName">{props.name}</p>
							<p className="pris">{props.price}</p>
							<button>BUY</button>
							<p className="itemDescription">{props.description}</p>
						</div>
					</div>
		}
					</>
				);
		}
	};
	return item();
}

export default Items;
