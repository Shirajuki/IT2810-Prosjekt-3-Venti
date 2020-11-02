import Product from "../models/product"
import { useLocalObservable } from "mobx-react-lite";

const FetchContext = () => {
	const store = useLocalObservable(() => ({
		hidden: true,
		currentPage: 0,
		pageSize: 15,
		pageCount: 0,
		productsCount: 0,
		products: [],
		filterTerm: [],
		setHidden(b: boolean) {
			this.hidden = b;
		},
		setCurrentPage(n: number) {
			this.currentPage = n;
		},
		setPageCount(n: number) {
			this.pageCount = n;
		},
		setProductsCount(n: number) {
			this.productsCount = n;
		},
		setProducts(p: Product[]) {
			this.products = p.concat();
		},
		setFilterTerm(s: String[]) {
			this.filterTerm = s.concat();
		},
		search(sortRefVal: string, searchRefVal: string) {
			if (this.hidden) {
				this.setHidden(false);
			} else {
				console.log("opened")
				this.getAPI(sortRefVal, searchRefVal);
			}
		},
		addOrRemoveFilter(item: String) {
			const pos = this.filterTerm.indexOf(item);
			const newList = this.filterTerm.concat();
			if (pos < 0 ) {
				newList.push(item);
			} else {
				newList.splice(pos,1);
			}
			this.setFilterTerm(newList);
		},
		async getAPI(sortRefVal: string, searchRefVal: string) {
			let url: string = `http://localhost:8080/?pageOffset=${this.currentPage}&pageSize=${this.pageSize}&sortTerm=${sortRefVal}`;
			if (this.filterTerm.length > 0) url += `&filterTerm=${JSON.stringify(this.filterTerm)}`;
			if (searchRefVal) url += `&searchTerm=${searchRefVal}`;
			// url += "&cart=true"
			console.log(312321,this.filterTerm, url);
			const response = await fetch(url,{
				method: 'GET',
				mode: 'cors',
				credentials: 'include', // Don't forget to specify this if you need cookies
			});
			const countProducts = async () => {
				const response = await fetch(url+"&count=true");
				const {count = 0} = await response.json()
				this.setProductsCount(count)
			}
			const data = await response.json();
			console.log("got item data", data);
			countProducts()
			try {
				console.log("initialize",data);
				this.setProducts(data);
			} catch (error) {
				console.log(error);
			}
		}
	}));
	return store;
};
export default FetchContext;
