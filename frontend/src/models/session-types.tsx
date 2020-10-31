import Product from "../models/product"
export type SessionStoreSchema = {
	cart: string,
	session: { sessionID: string },
	setCart: (s: string) => void,
	setSession: (s: string) => void,
	editCart: (products: Product[]) => void,
	removeCart: (products: Product[]) => void,
	getCart: string,
}
