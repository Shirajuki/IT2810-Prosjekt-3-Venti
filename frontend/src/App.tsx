import React, { useEffect, useState, useRef, FC, useContext} from 'react';
import ReactPaginate from 'react-paginate';
import Product from "./models/product"
import Carousel from './components/Carousel';
import ItemDisplay from './components/ItemDisplay';
import ProductFilters from './components/ProductFilters';
import Modal from './components/Modal';
import Cookies from "js-cookie";

import { observer } from "mobx-react-lite"
import { RootStoreContext } from "./stores/root-store";

const App: FC = observer(() => {
	const CTX = useContext(RootStoreContext);
	const searchRef = useRef(null);
	const sortRef = useRef(null);

	//Declares a modal used for displaying the art
	const [modal, setModal] = useState({
		id: "none",
		product: null,
	});
	const itemModal = (id: string, product: Product = null) => {
		setModal({ id: id, product: product });
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if(event.key === 'Enter') {
			CTX.fetchStore.search(sortRef?.current?.value, searchRef?.current?.value);
		}
	}
	// Pagination
	useEffect(() => {
	  CTX.fetchStore.setPageCount(Math.ceil(CTX.fetchStore.productsCount / CTX.fetchStore.pageSize))
	}, [CTX.fetchStore.productsCount, CTX.fetchStore.pageSize])

    useEffect(() => {
        CTX.fetchStore.getAPI(sortRef?.current?.value, searchRef?.current?.value);
	}, [CTX.fetchStore.currentPage, CTX.fetchStore.pageSize, CTX.fetchStore.filterTerm]);

	useEffect(() => {
		const cart = CTX.sessionStore.getCart;
		let cookie = Cookies.get("connect.sid")||"none";
		if (cookie !== "none") cookie = cookie.split(".")[0].substring(2);
		CTX.sessionStore.setCart(""+cart);
		CTX.sessionStore.setSession(cookie);
	}, [])
	return (
		<>
			<div className="divWrapper">
				<header id="nav">
					<nav>
						<div className="logo">
							<a href="/"><img src="images/logo_transparent.png" alt={CTX.sessionStore.session.sessionID}/></a>
						</div>
						<div>
							<div style= {{display:(CTX.fetchStore.hidden ? "none" : "block")}}>
								<input type="text" name="search" ref={searchRef} onKeyPress={handleKeyPress} required />
							</div>
							<button onClick={()=>CTX.fetchStore.search(sortRef?.current?.value, searchRef?.current?.value)}><span role="img" aria-label="search">🔎</span></button>
							<button onClick={() => console.log(CTX.sessionStore.cart)}><span role="img" aria-label="cart">🛒</span></button>
							<button className="ThisIsATest" onClick={() => CTX.sessionStore.editCart(CTX.fetchStore.products)}>Add2Cart</button>
							<button className="ThisIsATestToo" onClick={() => CTX.sessionStore.removeCart(CTX.fetchStore.products)}>RM</button>
						</div>
					</nav>
				</header>
				<main>
					<div className="splash">
						<div className="splashEye">
							<h1>A wonderful serenity has taken <br/><span>possession of my entire soul.</span></h1>
							<a href="#itemDisplay"><button>SHOW ITEMS</button></a>
							<img src="splash.png" alt="splash"/>
						</div>
					</div>
					<a href="#carousel"><img src="banner1.jpeg" alt="Banner1"/></a>
					<div className="section">
						<span id="carousel" className="hiddenAnchor"></span>
						<h1>NEWS</h1>
						<Carousel setModal={itemModal}/>
					</div>
					<div className="section">
						<div className="shopping">
							<aside>
								<ProductFilters/>
							</aside>
							<div className="itemDisplayWrapper">
								<span id="itemDisplay" className="hiddenAnchor"></span>
								<div className="filter">SORT BY:</div>
								<select name="sort" id="sortFilter" ref={sortRef} onChange={()=>{
									CTX.fetchStore.getAPI(sortRef?.current?.value, searchRef?.current?.value);
									CTX.fetchStore.setCurrentPage(0)}
								}>
									<option value="name_asc" selected={true}>Name A - Z</option>
									<option value="name_desc">Name Z - A</option>
									<option value="price_asc">Price $ - $$$</option>
									<option value="price_desc">Price $$$ - $</option>
								</select>
								<div className="itemNavigation">
									<ReactPaginate  previousLabel={'previous'}
                                      nextLabel={'next'}
                                      breakLabel={'...'}
                                      breakClassName={'break-me'}
                                      pageCount={CTX.fetchStore.pageCount}
									  forcePage={CTX.fetchStore.currentPage}
                                      marginPagesDisplayed={1}
                                      pageRangeDisplayed={3}
                                      onPageChange={({selected}) => CTX.fetchStore.setCurrentPage(selected)}
                                      containerClassName={'pagination'}
                                      activeClassName={'active'} />
								</div>
								<ItemDisplay setModal={itemModal} itemList={CTX.fetchStore.products}/>
								<div className="itemNavigation">
									<ReactPaginate  previousLabel={'previous'}
                                      nextLabel={'next'}
                                      breakLabel={'...'}
                                      breakClassName={'break-me'}
									  pageCount={CTX.fetchStore.pageCount}
									  forcePage={CTX.fetchStore.currentPage}
                                      marginPagesDisplayed={1}
                                      pageRangeDisplayed={3}
                                      onPageChange={({selected}) => CTX.fetchStore.setCurrentPage(selected)}
                                      containerClassName={'pagination'}
                                      activeClassName={'active'} />
								</div>
							</div>
						</div>
					</div>
					<img src="banner2.jpg" alt="Banner2"/>
				</main>
				<footer>
					<div className="footerWrapper">
						<div className="us">
							<button>NEWS</button>
							<button>ABOUT US</button>
							<button>CATALOG</button>
							<button>CONTACTS</button>
							<button>FAQ</button>
						</div>
						<div className="social">
							<h2>VENTI</h2>
							<div>
								<button>FB</button>
								<button>SP</button>
								<button>IG</button>
								<button>TW</button>
							</div>
						</div>
						<div className="info">
							<h2>Website designed by:</h2>
							<p>Team7</p>
						</div>
					</div>
				</footer>
				<Modal modal={modal} setModal={itemModal}/>
			</div>
		</>
	);
})

export default App;
