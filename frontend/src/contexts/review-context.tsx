import Review from "../models/review"
import { useLocalObservable } from "mobx-react-lite";

const ReviewContext = () => {
	const store = useLocalObservable(() => ({
		/*observables here*/
		reviews: [],
		session: { sessionID: "none" },
		/*actions here*/
		setReviews(reviews: Review[]) {
			this.reviews = reviews.concat();
		},
		setSession(s: string) {
			this.session.sessionID = s;
		},
		get sessionId() {
			return this.session.sessionID;
		},
		postReviews(productId: string, reviewText: string) {
			const rndName = "Jonny";
			console.log(reviewText,this.sessionId,rndName,productId);
			if (this.sessionId && rndName && reviewText && productId) {
				console.log("sending...")
				const getAPI = async () => {
					const url: string = `http://localhost:8080/post-review/?productId=${productId}&sessionId=${this.sessionId}&name=${rndName}&reviewText=${reviewText}`;
					fetch(url,{
						method: 'POST',
						mode: 'cors',
						credentials: 'include', // Don't forget to specify this if you need cookies
					})
					try {
						console.log("POSTED!");
						this.getReviews(productId);
						return true;
					} catch (error) {
						return false;
					}
				};
				getAPI();
				return false;
			}
		},
		getReviews(productId: string) {
			const getAPI = async () => {
				const response = await fetch(`http://localhost:8080/reviews/${productId}`,{
					method: 'GET',
					mode: 'cors',
					credentials: 'include', // Don't forget to specify this if you need cookies
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
