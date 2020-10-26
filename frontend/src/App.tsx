import React, { Fragment, useEffect, useState, useRef } from 'react';
import Product from "./models/product"
import Carousel from './components/Carousel';
import ItemDisplay from './components/ItemDisplay';
import Modal from './components/Modal';
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from 'constants';

const App = () => {
	//Declares a modal used for displaying the art
	const [modal, setModal] = useState({
		title: "none",
	});

	const itemModal = (title: string) => {
		setModal({ title: title });
	};

	
    useEffect(() => {
        const getAPI = async () => {
            const response = await fetch('http://localhost:8080/');
            const data = await response.json();

            try {
                console.log(data);
                setLoading(false);
                setProduct(data);
            } catch (error) {
                console.log(error);
            }
        };
        getAPI();
    }, []);

    const [product, setProduct] = useState<Product[]>([]);
    const [searchResult, setSearchResult] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [hidden, setHidden] = useState(true);
	const [filterResult, setFilter] = useState<Product[]>([]);
	const [sortList, setSort] = useState<Product[]>([]);
	const searchRef = useRef(null);
	const sortRef = useRef(null);
	const filterRef = useRef(null);

	var handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if(event.key === 'Enter'){
			search();
		  }
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
						console.log(data);
						setSearchResult(data);
					} catch (error) {
						console.log(error);
					}
				}
			};getAPI();
		}
	}

	const filterList : String[] = [];
	function addOrRemoveFilter(category: String, item:String){
		let pos = filterList.indexOf(item);
		if (pos < 0 )
			filterList.push(item);
		else
			filterList.splice(pos,1);
		console.log(filterList)
		filter();
	}

	function filter(){
		const getAPI = async () => {
			if (filterList.length > 0 ){
				for (var val in filterList){
					console.log(filterRef.current.value)
						if(filterRef.current) {
						const response = await fetch(`http://localhost:8080/filter-products/${filterRef.current!.value || ""}`);
						const data = await response.json();
						
						try {
							console.log(data);
							setFilter(data);
						} catch (error) {
							console.log(error);
						}
					}
				};getAPI(); 
				}
			}
	}

	function sortFilter(sort:any){
		if (sort !== 'none') {
			const getAPI = async () => {
				console.log(sortRef.current.value)
				if(sortRef.current) {
				const response = await fetch(`http://localhost:8080/sort-products/${sortRef.current!.value || ""}`);
				const data = await response.json();
				
				try {
					console.log(data);
					setSort(data); 
				} catch (error) {
					console.log(error);
				}
				}
			};getAPI(); 
		}
	}



	return (
		<>
			<div className="divWrapper">
				<header id="nav">
					<nav>
						<h3>logo</h3>
						<button><h2>TECHNIQUE</h2></button>
						<div>
						<div style= {{display:(hidden ? "none" : "block")}}>
                    	
                        	<input type="text" name="search" ref={searchRef} onKeyPress={handleKeyPress} required />
                    	</div>
						
							<button onClick={()=>search()}>🔎</button>
							<button>🛒</button>
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
								<ul>
									<li><button onClick={()=>addOrRemoveFilter("product_type", "lipstick")}>Lipstick</button></li>
									<li><button onClick={()=>addOrRemoveFilter("product_type", "foundation")}>Foundation</button></li>
									<li><button onClick={()=>addOrRemoveFilter("product_type", "eyeshadow")}>Eyeshadow</button></li>
								</ul>
								<h2>Brand</h2>
								<ul>
									<li><button onClick={()=>addOrRemoveFilter("brand", "dior")}>Dior</button></li>
									<li><button onClick={()=>addOrRemoveFilter("brand", "colourpop")}>Colourpop</button></li>
									<li><button onClick={()=>addOrRemoveFilter("brand", "makeup_geek")}>Makeup Geek</button></li>
								</ul>
								<h2>Price</h2>
								<input type="number" value="0 - 200kr"/>
								<h2>Colors</h2>
								<ul>
									<li><button onClick={()=>addOrRemoveFilter("color", "black")}>Black</button></li>
									<li><button onClick={()=>addOrRemoveFilter("color", "red")}>Red</button></li>
									<li><button onClick={()=>addOrRemoveFilter("color", "purple")}>Purple</button></li>
								</ul>
							</aside>
							<div className="itemDisplayWrapper">
								<div className="filter">SORT BY:</div>
								<select name="sort" id="sortFilter" onChange={()=>sortFilter("{this.value}")}>
									<option value="none"> --- </option>
									<option value="asc_Name">Name A - Z</option>
									<option value="desc_Name">Name Z - A</option>
									<option value="asc_Price">Price $ - $$$</option>
									<option value="desc_Price">Price $$$ - $</option>
								</select>
								<ItemDisplay title="" setModal={itemModal}/>
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
