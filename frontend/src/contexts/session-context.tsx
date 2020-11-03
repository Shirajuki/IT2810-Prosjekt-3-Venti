import { useLocalObservable } from "mobx-react-lite";

const SessionContext = () => {
	const store = useLocalObservable(() => ({
		/*observables here*/
		cart: "[[1,1]]",
		session: { sessionID: "none" },
		/*actions here*/
		setCart(s: string) {
			this.cart = s;
		},
		setSession(s: string) {
			this.session.sessionID = s;
		},
		editCart(productId: number) {
			console.log(productId, this.cart||"[]")
			let nCart = JSON.parse(this.cart||"[]");
			fetch('http://localhost:8080/editCart/'+productId,{
				method: 'POST',
				mode: 'cors',
				credentials: 'include', // Don't forget to specify this if you need cookies
			})
			.then(response => console.log(response));
			let existInCart = -1;
			for (let i=0; i<nCart.length; i++) {
				if (nCart[i][0] === productId) {
					existInCart = i;
					break;
				}
			}
			if (existInCart !== -1) {
				nCart[existInCart][1]++;
			} else {
				nCart.push([productId,1]);
			}
			this.setCart(JSON.stringify(nCart));
			console.log(111,this.cart)
		},
		removeCart(productId: number) {
			let nCart = JSON.parse(this.cart||"[]");
			fetch('http://localhost:8080/removeCart/'+productId,{
				method: 'POST',
				mode: 'cors',
				credentials: 'include', // Don't forget to specify this if you need cookies
			})
			.then(response => console.log(response));
			let indexProduct = -1;
			for (let i=0; i<nCart.length; i++) {
				if (nCart[i][0] === productId) {
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
					console.log("got session",data, typeof data);
					return (data) ? data : "[]";
				} catch (error) {
					console.log(error);
				}
			}
			getAPI();
			return "[]";
		}
	}));
	return store;
};
export default SessionContext;
