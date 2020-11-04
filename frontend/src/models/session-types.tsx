import Product from "../models/product"
export type SessionStoreSchema = {
	cart: string,
	cartProduct: Product[],
	session: { sessionID: string },
	cartActive: boolean,
	setCart: (s: string) => void,
	setCartProduct: (arr: Product[]) => void,
	setSession: (s: string) => void,
	editCart: (n: number, t: boolean) => void,
	addCart: (n: number) => void,
	setCartActive: (b: boolean) => void,
	deleteCart: (n: number) => void,
	removeCart: (n: number) => void,
	updateCart: () => void,
	getCart: () => void,
	productCount: (productId: number) => number,
	cartTotalPrice: number,
}
