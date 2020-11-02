export type SessionStoreSchema = {
	cart: string,
	session: { sessionID: string },
	setCart: (s: string) => void,
	setSession: (s: string) => void,
	editCart: (n: number) => void,
	removeCart: (n: number) => void,
	getCart: string,
}
