import Review from "../models/review"
export type ReviewStoreSchema = {
	reviews: Review[],
	session: { sessionID: string },
	setReviews: (reviews: Review[]) => void,
	setSession: (sessionId: string) => void,
	sessionId: string,
	postReviews: (productId: string, reviewText: string, rndName: string, stars: number) => Promise<boolean>,
	getReviews: (productId: string) => void,
}
