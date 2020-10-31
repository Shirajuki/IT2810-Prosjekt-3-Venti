import Product from "../models/product"
import { useLocalObservable } from "mobx-react-lite";

const SessionContext = () => {
	const store = useLocalObservable(() => ({
		/*observables here*/
		cart: "[]",
		session: { sessionID: "none" },
		/*actions here*/
		setCart(s: string) {
			this.cart = s;
		},
		setSession(s: string) {
			this.session.sessionID = s;
		},
		editCart(products: Product[]) {
			console.log("test1")
			let nCart = JSON.parse(this.cart);
			let rndProduct = ""+products[Math.floor(Math.random() * products.length)]?.id || "-1";
			fetch('http://localhost:8080/editCart/'+rndProduct,{
				method: 'POST',
				mode: 'cors',
				credentials: 'include', // Don't forget to specify this if you need cookies
			})
			.then(response => console.log(response));
			let existInCart = -1;
			for (let i=0; i<nCart.length; i++) {
				if (nCart[i][0] === rndProduct) {
					existInCart = i;
					break;
				}
			}
			if (existInCart !== -1) {
				nCart[existInCart][1]++;
			} else {
				nCart.push([rndProduct,1]);
			}
			this.setCart(JSON.stringify(nCart));
		},
		removeCart(products: Product[]) {
			console.log("test2")
			let nCart = JSON.parse(this.cart);
			let rndProduct = ""+products[Math.floor(Math.random() * products.length)].id;
			fetch('http://localhost:8080/removeCart/'+rndProduct,{
				method: 'POST',
				mode: 'cors',
				credentials: 'include', // Don't forget to specify this if you need cookies
			})
			.then(response => console.log(response));
			let indexProduct = -1;
			for (let i=0; i<nCart.length; i++) {
				if (nCart[i][0] === rndProduct) {
					indexProduct = i;
					break;
				}
			}
			if (indexProduct !== -1) {
				nCart[indexProduct][1]--;
				if (nCart[indexProduct][1] === 0) nCart.splice(indexProduct, 1);
			}
			this.setCart(JSON.stringify(nCart));
		},
		get getCart() {
			let url: string = "http://localhost:8080/getCart";
			const getAPI = async () => {
				const response = await fetch(url,{
					method: 'GET',
					mode: 'cors',
					credentials: 'include', // Don't forget to specify this if you need cookies
				});
				const data = await response.json();
				try {
					console.log("initialize",data);
					return data;
				} catch (error) {
					console.log(error);
				}
			}
			getAPI();
			return "";
		}
	}));
	return store;
};
export default SessionContext;
