import { useLocalObservable } from "mobx-react-lite";

const HeroContext = () => {
	const store = useLocalObservable(() => ({
		/*observables here*/
		heroes: [],
		/*actions here*/
		addHeroes(n: number) {
			this.heroes.push(String(n));
		},
		/*computed values i.e. derived state*/
		get totalHeroes() {
			return this.heroes.length;
		}
	}));
	return store;
};
export default HeroContext;
