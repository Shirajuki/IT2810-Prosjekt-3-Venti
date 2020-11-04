import Review from "../models/review"
import { useLocalObservable } from "mobx-react-lite";

const ReviewContext = () => {
	const store = useLocalObservable(() => ({
		reviews: [],
		session: { sessionID: "none" },
		setReviews(reviews: Review[]) {
			this.reviews = reviews.concat();
		},
		setSession(sessionId: string) {
			this.session.sessionID = sessionId;
		},
		get sessionId() {
			return this.session.sessionID;
		},
		async postReviews(productId: string, reviewText: string, rndName: string, stars: number) {
			if (this.sessionId && rndName && reviewText && productId && stars) {
				const getAPI = async () => {
					const url: string = `http://localhost:8080/post-review/?productId=${productId}&sessionId=${this.sessionId}&name=${rndName}&reviewText=${reviewText}&stars=${stars}`;
					await fetch(url,{
						method: 'POST',
						mode: 'cors',
						credentials: 'include',
					})
					try {
						this.getReviews(productId);
						return true;
					} catch (error) {
						return false;
					}
				};
				return await getAPI();
			}
			return false;
		},
		getReviews(productId: string) {
			const getAPI = async () => {
				const response = await fetch(`http://localhost:8080/reviews/${productId}`,{
					method: 'GET',
					mode: 'cors',
					credentials: 'include',
				});
				const data = await response.json();
				try {
					this.setReviews(data);
				} catch (error) {
					console.log(error);
				}
			};
			getAPI();
		}
	}));
	return store;
};
export default ReviewContext;
