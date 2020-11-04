import Product from "../models/product"
import { useLocalObservable } from "mobx-react-lite";

const SessionContext = () => {
	const store = useLocalObservable(() => ({
		cart: "[]",
		cartProduct: [],
		session: { sessionID: "none" },
		cartActive: false,
		setCart(sessionId: string) {
			this.cart = sessionId;
		},
		setCartProduct(productArr: Product[]) {
			this.cartProduct = productArr.concat();
		},
		setSession(sessionId: string) {
			this.session.sessionID = sessionId;
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
			fetch('http://localhost:8080/editCart/'+productId,{
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
			})
			const nCart = JSON.parse(this.cart);
			let exists: boolean = false;
			for (const map of nCart) {
				if (Number(map[0]) === productId) {
					map[1]++;
					exists = true;
					break;
				}
			}
			if (!exists) {
				nCart.push([String(productId),1]);
				this.getCart();
			}
			this.setCart(JSON.stringify(nCart));
		},
		removeCart(productId: number) {
			fetch('http://localhost:8080/removeCart/'+productId,{
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
			})
			const nCart = JSON.parse(this.cart);
			let exists: boolean = false;
			for (const map of nCart) {
				if (Number(map[0]) === productId) {
					map[1]--;
					exists = true;
					break;
				}
			}
			if (!exists) {
				this.getCart();
			} else {
				this.setCart(JSON.stringify(nCart));
			}
		},
		deleteCart(productId: number) {
			fetch('http://localhost:8080/deleteCart/'+productId,{
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
			})
			this.getCart();
		},
		setCartActive(active: boolean) {
			if (active) this.getCart();
			this.cartActive = active;
		},
		getCart() {
			const getAPI = async () => {
				const response = await fetch("http://localhost:8080/getCart",{
					method: 'GET',
					mode: 'cors',
					credentials: 'include',
				});
				const data = await response.json();
				console.log(data);
				try {
					this.setCart(data[0]);
					this.setCartProduct(data[1]);
				} catch (error) {
					console.log(error);
				}
			}
			getAPI();
		},
		updateCart() {
			fetch('http://localhost:8080/updateCart/'+this.cart,{
				method: 'POST',
				mode: 'cors',
				credentials: 'include',
			})
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
