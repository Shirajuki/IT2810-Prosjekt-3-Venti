import React, { useEffect, useState, useRef } from 'react';
import Product from "./models/product"
import Carousel from './components/Carousel';
import ItemDisplay from './components/ItemDisplay';
import Modal from './components/Modal';
import Items from './components/Items';
import Cookies from "js-cookie";

const App = () => {
	//Declares a modal used for displaying the art
	const [modal, setModal] = useState({
		id: "none",
		product: null,
	});

	const itemModal = (id: string, product: Product = null) => {
		setModal({ id: id, product: product });
	};

    const [product, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchResult, setSearchResult] = useState<Product[]>([]);
	const [hidden, setHidden] = useState(true);
	const [filterResult, setFilter] = useState<Product[]>([]);
	const [filterList, setFilterList] = useState([]);
	const [sortList, setSort] = useState<Product[]>([]);
	const searchRef = useRef(null);
	const sortRef = useRef(null);
	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if(event.key === 'Enter'){
			search();
		  }
	}
	function updateProducts(data: {filterResultList1: Product[], searchResultList1: Product[], sortResultList: Product[], searched: boolean}) {
		const productsList: Product[] = [];
		const { filterResultList1, searchResultList1, sortResultList, searched} = data;
		const filterResultList: String[] = filterResultList1.map(e => e.id);
		const searchResultList: String[] = searchResultList1.map(e => e.id);
		for (const prod of sortResultList) {
			if (filterResultList.length > 0) {
				if (filterResultList.includes(prod.id)) {
					if (searched) {
						if (searchResultList.includes(prod.id)) productsList.push(prod);
					} else {
						productsList.push(prod);
					}
				}
			} else {
				if (searched) {
					if (searchResultList.includes(prod.id)) productsList.push(prod);
				} else {
					productsList.push(prod);
				}
			}
		}
		setProduct(productsList)
	}
	function search() {
		if (hidden) {
			setHidden(false);
		}
		else {
			console.log("opened")
				const getAPI = async () => {
					console.log(searchRef.current.value)
					if(searchRef.current) {
					const response = await fetch(`http://localhost:8080/search-products/${searchRef.current!.value || ""}`);
					const data = await response.json();
					
					try {
						setSearchResult(data);
						updateProducts({filterResultList1: filterResult, searchResultList1: data, sortResultList: sortList, searched: true});
					} catch (error) {
						console.log(error);
					}
				}
			};
			getAPI();
		}
	}

	function filter(list: Array<String>){
		console.log(list);
		const getAPI = async () => {
			if (list.length > 0) {
				console.log("sending...", JSON.stringify(list));
				const response = await fetch(`http://localhost:8080/filter-products/${JSON.stringify(list) || ""}`);
				const data = await response.json();
				try {
					console.log("got filter",data);
					setFilter(data);
				} catch (error) {
					console.log(error);
				}
			} else {
				console.log("HENT ALL DATA")
				setFilter([]);
			}
		}
		getAPI();
	}

	function addOrRemoveFilter(item:String){
		const pos = filterList.indexOf(item);
		const newList = filterList.concat();
		if (pos < 0 ) {
			newList.push(item);
		} else {
			newList.splice(pos,1);
		}
		setFilterList(newList);
		console.log(123,pos,newList)
		filter(newList);
	}

	function sortFilter(){
		// const strSort = (document.getElementById("sortFilter") as HTMLSelectElement).value;
		const getAPI = async () => {
			console.log(sortRef.current.value);
			const response = await fetch(`http://localhost:8080/sort-products/${sortRef.current.value || ""}`);
			const data = await response.json();
			
			try {
				console.log("got sortdata",data);
				setSort(data);
				updateProducts({filterResultList1: filterResult, searchResultList1: searchResult, sortResultList: data, searched: false});
			} catch (error) {
				console.log(error);
			}
		}
		getAPI(); 
	}
    useEffect(() => {
        const getAPI = async () => {
            const response = await fetch('http://localhost:8080/',{
				method: 'GET',
				mode: 'cors',
				credentials: 'include', // Don't forget to specify this if you need cookies
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Origin':'http://localhost:3000',
				},
			});
            const data = await response.json();
            try {
                console.log("initialize",data);
                setLoading(false);
				const cart = data.pop();
				setProduct(data);
				setSort(data);
				setCart(""+cart);
				let cookie = Cookies.get("connect.sid")||"none";
				if (cookie !== "none") cookie = cookie.split(".")[0].substring(2);
				setSession({sessionID: cookie});
            } catch (error) {
                console.log(error);
            }
        };
        getAPI();
		updateProducts({filterResultList1: filterResult, searchResultList1: searchResult, sortResultList: sortList, searched: false});
	}, []);

	useEffect(() => {
		updateProducts({filterResultList1: filterResult, searchResultList1: searchResult, sortResultList: sortList, searched: false});
	}, [filterResult])

	const [cart, setCart] = useState<string>("[]");
	const [session, setSession] = useState({
		sessionID: "none",
	});
	function editCart(productId: number = -1) {
		let nCart = JSON.parse(cart);
		let rndProduct = ""+product[Math.floor(Math.random() * product.length)]?.id || "-1";
		if (productId !== -1) {
			rndProduct = ""+productId;
		} else {
			return;
		}
		fetch('http://localhost:8080/editCart/'+rndProduct,{
			method: 'POST',
			mode: 'cors',
			credentials: 'include', // Don't forget to specify this if you need cookies
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Origin':'http://localhost:3000',
			}
		})
		.then(response => console.log(response));
		let existInCart = -1;
		for (let i=0; i<nCart.length; i++) {
			if (nCart[i][0] === rndProduct) {
				existInCart = i;
				break;
			}
		}
		if (existInCart !== -1) {
			nCart[existInCart][1]++;
		} else {
			nCart.push([rndProduct,1]);
		}
		setCart(JSON.stringify(nCart));
	}
	function removeCart(productId: number = -1) {
		let nCart = JSON.parse(cart);
		let rndProduct = ""+product[Math.floor(Math.random() * product.length)].id;
		if (productId !== -1) {
			rndProduct = ""+productId;
		}
		fetch('http://localhost:8080/removeCart/'+rndProduct,{
			method: 'POST',
			mode: 'cors',
			credentials: 'include', // Don't forget to specify this if you need cookies
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Origin':'http://localhost:3000',
			}
		})
		.then(response => console.log(response));
		let indexProduct = -1;
		for (let i=0; i<nCart.length; i++) {
			if (nCart[i][0] === rndProduct) {
				indexProduct = i;
				break;
			}
		}
		if (indexProduct !== -1) {
			nCart[indexProduct][1]--;
			if (nCart[indexProduct][1] === 0) nCart.splice(indexProduct, 1);
		}
		setCart(JSON.stringify(nCart));
	}
	/*
				<div className="searchResults" style= {{display:(searched ? "none" : "none")}}>
				{searchResult.map(item => (
					<Items id={item.id} img={item.image_link} name={item.name} description={item.description} price={item.price} isCarousel={false} onClick={() => console.log("Hei")} isModal = {true} />
				))}
				</div>
	 */
	return (
		<>
			<div className="divWrapper">
				<header id="nav">
					<nav>
						<h3>logo {session.sessionID}</h3>
						<button><h2>TECHNIQUE</h2></button>
						<div>
						<div style= {{display:(hidden ? "none" : "block")}}>
                        	<input type="text" name="search" ref={searchRef} onKeyPress={handleKeyPress} required />
                    	</div>
							<button onClick={()=>search()}>🔎</button>
							<button onClick={() => console.log(cart)}>🛒</button>
							<button className="ThisIsATest" onClick={() => editCart()}>Add2Cart</button>
							<button className="ThisIsATestToo" onClick={() => removeCart()}>RM</button>
						</div>
					</nav>
				</header>
				<main>
					<div className="splash">
						<div className="splashEye">
							<h1>A wonderful serenity has taken <br/><span>possession of my entire soul.</span></h1>
							<button>SHOW ITEMS</button>
							<img src="splash.png" alt="splash"/>
						</div>
					</div>
					<img src="banner1.jpeg" alt="Banner1"/>
					<div className="section">
						<h1>NEWS</h1>
						<Carousel setModal={itemModal}/>
					</div>
					<div className="section">
						<div className="shopping">
							<aside>
								<h1>Our Products</h1>
								<h2>Product Type</h2>
								<input type="checkbox" id="productType1" name="productType1" onClick={()=>addOrRemoveFilter("product_type=lipstick")}/>
  									<label htmlFor="productType1"> Lipstick</label><br></br>
								<input type="checkbox" id="productType2" name="productType2" onClick={()=>addOrRemoveFilter("product_type=foundation")}/>
									<label htmlFor="productType2"> Foundation</label><br></br>
								<input type="checkbox" id="productType3" name="productType3" onClick={()=>addOrRemoveFilter("product_type=eyeshadow")}/>
									<label htmlFor="productType3"> Eyeshadow</label><br></br>
								<h2>Brand</h2>
								<input type="checkbox" id="brand1" name="brand1" onClick={()=>addOrRemoveFilter("brand=dior")}/>
  									<label htmlFor="brand1"> Dior</label><br></br>
								<input type="checkbox" id="brand2" name="brand2" onClick={()=>addOrRemoveFilter("brand=colourpop")}/>
									<label htmlFor="brand2"> Colourpop</label><br></br>
								<input type="checkbox" id="brand3" name="brand3" onClick={()=>addOrRemoveFilter("brand=makeup_geek")}/>
									<label htmlFor="brand3"> Makeup Geek</label><br></br>
								<h2>Price</h2>
								<input type="number" defaultValue="0" placeholder="0 - 200kr"/>
								<h2>Colors</h2>
								<input type="checkbox" id="color1" name="color1" onClick={()=>addOrRemoveFilter("color=black")}/>
  									<label htmlFor="color1"> Black</label><br></br>
								<input type="checkbox" id="color2" name="color2" onClick={()=>addOrRemoveFilter("color=red")}/>
									<label htmlFor="color2"> Red</label><br></br>
								<input type="checkbox" id="color3" name="color3" onClick={()=>addOrRemoveFilter("color=purple")}/>
									<label htmlFor="color3"> Purple</label><br></br>
							</aside>
							<div className="itemDisplayWrapper">
								<div className="filter">SORT BY:</div>
								<select name="sort" id="sortFilter" ref={sortRef} onChange={()=>sortFilter()}>
									<option value="name_asc" selected={true}>Name A - Z</option>
									<option value="name_desc">Name Z - A</option>
									<option value="price_asc">Price $ - $$$</option>
									<option value="price_desc">Price $$$ - $</option>
								</select>
								<ItemDisplay setModal={itemModal} itemList={product}/>
								<div className="itemNavigation">- 1 2 3 .. 20 -</div>
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
							<h2>TECHNIQUE</h2>
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
};

export default App;
