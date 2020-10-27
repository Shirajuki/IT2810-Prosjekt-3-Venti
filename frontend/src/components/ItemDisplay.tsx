import React, { useEffect, useState } from "react";
import Product from "../models/product";
import Items from './Items';
//Declares type of title
type slideType = {
	title: string;
}
interface IProps {
	title: string;
	setModal: (title:string) => void;
}

const url = "";

function ItemDisplay(props: IProps) {

	useEffect(() => {
        const getAPI = async () => {
            const response = await fetch('http://localhost:8080/' + url);
			const data = await response.json();
			console.log(data)

            try {
                setLoading(false);
                setProduct(data);
            } catch (error) {
                console.log(error);
            }
        };
        getAPI();
    }, [url]);

    const [product, setProduct] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	return (
	<>
		<div className="itemDisplay">
			{product.map(item => (
				<Items id={item.id} img={item.image_link} name={item.name} description={item.description} price={item.price} isCarousel={false} onClick={() => props.setModal(item.id) }isModal = {true} />
			))}
		</div>
	</>
	);
}

export default ItemDisplay;
