import React, { useEffect, useState } from "react";
import Product from "../models/product";
import Items from './Items';
interface IProps {
	modal: {id: string},
	setModal: (id:string) => void;
}
function Modal( props: IProps ) {

	
    const [product, setProduct] = useState<Product>();
	const [loading, setLoading] = useState(true);
	

	useEffect(()=>{
		const getAPI = async () => {
			const response = await fetch(`http://localhost:8080/${props.modal.id}`);
            const data = await response.json();
            try {
				console.log(data);
                setLoading(false);
                setProduct(data);
            } catch (error) {
				console.log(error);
            }
		};
		if(props.modal.id !== "none") {
		getAPI();
		}
	},[props.modal.id])

	
	return (
		<div
			className={`modalContainer ${props.modal.id === "none" ? "hidden" : "shown"}`}
		>
			<div className="modalContent">
				<div className="modalHeader">
					<div className="closeBtn" onClick={() => props.setModal("none")}>
						&#10006;
					</div>
				</div>
				{product !== undefined ? <Items id={product._id} img={product.image_link} name={product.name} description={product.description} price={product.price} onClick={() => void(0)} isModal={false} />	: null}
			</div>
		</div>
	);
}
export default Modal;

