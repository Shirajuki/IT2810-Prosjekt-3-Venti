import Product from "../models/product"
export type FetchStoreSchema = {
	hidden: boolean;
	currentPage: number;
	pageSize: number;
	pageCount: number;
	productsCount: number;
	products: Product[],
	filterTerm: string[],
	setHidden: (b: boolean) => void;
	setCurrentPage: (n: number) => void
	setPageCount: (n: number) => void;
	setProductsCount: (n: number) => void;
	setProducts: (p: Product[]) => void;
	setFilterTerm: (s: String[]) => void;
	search: (sortRefVal: string, searchRefVal: string) => void;
	addOrRemoveFilter: (item: String) => void;
	getAPI: (sortRefVal: string, searchRefVal: string) => Promise<void>,
}
