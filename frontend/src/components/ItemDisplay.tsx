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

function ItemDisplay(props: IProps) {

	useEffect(() => {
        const getAPI = async () => {
            const response = await fetch('http://localhost:8080/');
            const data = await response.json();

            try {
                console.log(data);
                setLoading(false);
                setProduct(data);
            } catch (error) {
                console.log(error);
            }
        };
        getAPI();
    }, []);

    const [product, setProduct] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	return (
	<>
		<div className="itemDisplay">
			{product.map(item => (
				<Items id={item._id} img={item.image_link} name={item.name} description={item.description} price={item.price} onClick={() => props.setModal(item._id)} />
			))}
		</div>
	</>
	);
}

export default ItemDisplay;
