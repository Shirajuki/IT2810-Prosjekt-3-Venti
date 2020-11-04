import Product from "../models/product"
export type FetchStoreSchema = {
	hidden: boolean;
	currentPage: number;
	pageSize: number;
	pageCount: number;
	productsCount: number;
	products: Product[],
	filterTerm: string[],
	setHidden: (hidden: boolean) => void;
	setCurrentPage: (pageNumber: number) => void
	setPageCount: (pageCount: number) => void;
	setProductsCount: (productCount: number) => void;
	setProducts: (productArr: Product[]) => void;
	setFilterTerm: (filterTerms: String[]) => void;
	search: (sortRefVal: string, searchRefVal: string) => void;
	addOrRemoveFilter: (item: String) => void;
	getAPI: (sortRefVal: string, searchRefVal: string) => Promise<void>,
}
