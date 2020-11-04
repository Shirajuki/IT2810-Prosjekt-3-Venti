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
		setHidden(hidden: boolean) {
			this.hidden = hidden;
		},
		setCurrentPage(pageNumber: number) {
			this.currentPage = pageNumber;
		},
		setPageCount(pageCount: number) {
			this.pageCount = pageCount;
		},
		setProductsCount(productCount: number) {
			this.productsCount = productCount;
		},
		setProducts(productArr: Product[]) {
			this.products = productArr.concat();
		},
		setFilterTerm(filterTerms: String[]) {
			this.filterTerm = filterTerms.concat();
		},
		search(sortRefVal: string, searchRefVal: string) {
			if (this.hidden) {
				this.setHidden(false);
			} else {
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
			countProducts()
			try {
				this.setProducts(data);
			} catch (error) {
				console.log(error);
			}
		}
	}));
	return store;
};
export default FetchContext;
