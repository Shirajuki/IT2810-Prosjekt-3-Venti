import React, {useContext, useState} from "react";
import { RootStoreContext } from "../stores/root-store";
import { observer } from "mobx-react-lite"
import { observable } from "mobx";

const ProductFilters = observer(() => {
	const CTX = useContext(RootStoreContext);
	const [product] = useState(() =>
		observable({
			type: {
				"foundation": "Foundation",
				"bronzer": "Bronzer",
				"eyeshadow": "Eyeshadow",
				"eyeliner": "Eyeliner",
				"mascara": "Mascara",
				"lipstick": "Lipstick",
			},
			brand: {
				"clinique": "Clinique",
				"covergirl": "Covergirl",
				"dior": "Dior",
				"e.l.f.": "e.l.f",
				"l'oreal": "L'oreal",
				"lotus cosmetics usa": "Lotus Cosmetics USA",
				"marienatie":"Marienatie",
				"nyx":"nyx",
				"smashbox":"Smashbox",
			},
			get types() {
				return Object.entries(this.type);
			},
			get brands() {
				return Object.entries(this.brand);
			}
		})
	)
	return (
	<>
		<h1>Our Products</h1>
		<h2>Product Type</h2>
		{product.types.map((item: String[]) => (
			<label>
				<input data-cy="type" type="checkbox" onClick={()=>CTX.fetchStore.addOrRemoveFilter(`product_type=${item[0]}`)}/>
				{item[1]}
			</label>
		))}
		<br></br>
		<h2>Brand</h2>
		{product.brands.map((item: String[]) => (
			<label>
				<input data-cy="brand" type="checkbox" onClick={()=>CTX.fetchStore.addOrRemoveFilter(`brand=${item[0]}`)}/>
				{item[1]}
			</label>
		))}
	</>
	);
})
export default ProductFilters;
