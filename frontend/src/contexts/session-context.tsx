import Product from "../models/product"
import { useLocalObservable } from "mobx-react-lite";

const SessionContext = () => {
	const store = useLocalObservable(() => ({
		/*observables here*/
		cart: "[[1,1]]",
		cartProduct: [],
		session: { sessionID: "none" },
		cartActive: false,
		/*actions here*/
		setCart(s: string) {
			this.cart = s;
		},
		setCartProduct(arr: Product[]) {
			this.cartProduct = arr.concat();
		},
		setSession(s: string) {
			this.session.sessionID = s;
		},
		editCart(productId: number, type: boolean) {
			for (const map of JSON.parse(this.cart)) {
				if (Number(map[0]) === productId) {
					if (type) {
						this.addCart(productId);
					} else {
						if (Number(map[1]) > 1) this.removeCart(productId);
					}
					break;
				}
			}
		},
		addCart(productId: number) {
			console.log(productId, this.cart||"[]")
			fetch('http://localhost:8080/editCart/'+productId,{
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
			})
			this.getCart();
		},
		removeCart(productId: number) {
			console.log("Removed item",productId);
			fetch('http://localhost:8080/removeCart/'+productId,{
				method: 'POST',
				mode: 'cors',
				credentials: 'include', // Don't forget to specify this if you need cookies
			})
			this.getCart();
		},
		setCartActive(b: boolean) {
			if (b) this.getCart();
			this.cartActive = b;
		},
		getCart() {
			let url: string = "http://localhost:8080/getCart";
			const getAPI = async () => {
				const response = await fetch(url,{
					method: 'GET',
					mode: 'cors',
					credentials: 'include', // Don't forget to specify this if you need cookies
				});
				const data = await response.json();
				try {
					console.log("got session",data);
					this.setCart(data[0]);
					this.setCartProduct(data[1]);
				} catch (error) {
					console.log(error);
				}
			}
			getAPI();
		},
		productCount(productId: number) {
			for (const map of JSON.parse(this.cart)) {
				if (Number(map[0]) === productId) {
					return Number(map[1]);
				}
			}
			return 0;
		},
		get cartTotalPrice() {
			let sum = 0;
			const nCart = JSON.parse(this.cart);
			for (const product of this.cartProduct) {
				for (const map of nCart) {
					console.log(map,product.id,product.price)
					if (Number(map[0]) === Number(product.id)) {
						sum += product.price*Number(map[1]);
						break;
					}
				}
			}
			return sum;
		}
	}));
	return store;
};
export default SessionContext;
