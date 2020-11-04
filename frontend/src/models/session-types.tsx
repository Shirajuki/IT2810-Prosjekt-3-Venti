import Product from "../models/product"
export type SessionStoreSchema = {
	cart: string,
	cartProduct: Product[],
	session: { sessionID: string },
	cartActive: boolean,
	setCart: (cart: string) => void,
	setCartProduct: (productArr: Product[]) => void,
	setSession: (sessionId: string) => void,
	editCart: (productId: number, type: boolean) => void,
	addCart: (productId: number) => void,
	setCartActive: (active: boolean) => void,
	deleteCart: (productId: number) => void,
	removeCart: (productId: number) => void,
	updateCart: () => void,
	getCart: () => void,
	productCount: (productId: number) => number,
	cartTotalPrice: number,
}
