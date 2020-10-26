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

	function filter(list: Array<String>){
		console.log(list);
		const getAPI = async () => {
			if (list.length > 0 ){
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
					};getAPI(); 
				}
			else {
				console.log("hei")}
		}
	}

	const filterList : String[] = [];
	function addOrRemoveFilter(item:String){
		let pos = filterList.indexOf(item);
		if (pos < 0 )
			filterList.push(item);
		else
			filterList.splice(pos,1);
		filter(filterList);
	}

	function sortFilter(){
		var sort = (document.getElementById("sortFilter") as HTMLSelectElement);
		var strSort = sort.options[sort.selectedIndex].value;

		//console.log(strSort);
		if (strSort !== 'none') {
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
								<input type="checkbox" id="productType1" name="productType1" onClick={()=>addOrRemoveFilter("product_type=lipstick")} ref={filterRef} />
  									<label htmlFor="productType1"> Lipstick</label><br></br>
								<input type="checkbox" id="productType2" name="productType2" onClick={()=>addOrRemoveFilter("product_type=foundation")} ref={filterRef} />
									<label htmlFor="productType2"> Foundation</label><br></br>
								<input type="checkbox" id="productType3" name="productType3" onClick={()=>addOrRemoveFilter("product_type=eyeshadow")} ref={filterRef} />
									<label htmlFor="productType3"> Eyeshadow</label><br></br>
								<h2>Brand</h2>
								<input type="checkbox" id="brand1" name="brand1" onClick={()=>addOrRemoveFilter("brand=dior")} ref={filterRef} />
  									<label htmlFor="brand1"> Dior</label><br></br>
								<input type="checkbox" id="brand2" name="brand2" onClick={()=>addOrRemoveFilter("brand=colourpop")} ref={filterRef} />
									<label htmlFor="brand2"> Colourpop</label><br></br>
								<input type="checkbox" id="brand3" name="brand3" onClick={()=>addOrRemoveFilter("brand=makeup_geek")} ref={filterRef} />
									<label htmlFor="brand3"> Makeup Geek</label><br></br>
								<h2>Price</h2>
								<input type="number" value="0 - 200kr"/>
								<h2>Colors</h2>
								<input type="checkbox" id="color1" name="color1" onClick={()=>addOrRemoveFilter("color=black")} ref={filterRef} />
  									<label htmlFor="color1"> Black</label><br></br>
								<input type="checkbox" id="color2" name="color2" onClick={()=>addOrRemoveFilter("color=red")} ref={filterRef} />
									<label htmlFor="color2"> Red</label><br></br>
								<input type="checkbox" id="color3" name="color3" onClick={()=>addOrRemoveFilter("color=purple")} ref={filterRef} />
									<label htmlFor="color3"> Purple</label><br></br>
							</aside>
							<div className="itemDisplayWrapper">
								<div className="filter">SORT BY:</div>
								<select name="sort" id="sortFilter" onChange={()=>sortFilter()}>
									<option value="none"> --- </option>
									<option value="Name_asc" ref={sortRef}>Name A - Z</option>
									<option value="Name_desc" ref={sortRef}>Name Z - A</option>
									<option value="Price_asc" ref={sortRef}>Price $ - $$$</option>
									<option value="Price_desc" ref={sortRef}>Price $$$ - $</option>
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
