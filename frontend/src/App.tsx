import React, { Fragment, useEffect, useState, useRef } from 'react';
import Product from "./models/product"
import Carousel from './components/Carousel';
import ItemDisplay from './components/ItemDisplay';
import Modal from './components/Modal';
import Items from './components/Items';


const App = () => {
	//Declares a modal used for displaying the art
	const [modal, setModal] = useState({
		id: "none",
	});

	const itemModal = (id: string) => {
		setModal({ id: id });
	};

    const [searchResult, setSearchResult] = useState<Product[]>([]);
	const [hidden, setHidden] = useState(true);
	const [searched, setSearched] = useState(false);
	const searchRef = useRef(null);

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
						setSearchResult(data);
						setSearched(true);
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
				<div className="searchResults" style= {{display:(searched ? "block" : "none")}}>
				{searchResult.map(item => (
					<Items id={item._id} img={item.image_link} name={item.name} description={item.description} price={item.price} isCarousel={false} onClick={() => console.log("Hei")} isModal = {true} />
				))}
				</div>
				<main>
					<div className="splash">
						<div className="splashEye">
							<h1>A wonderful serenity has taken <br/><span>possesion of my entire soul.</span></h1>
							<button>SHOW ITEMS</button>
							<img src="splash.png" alt="splah"/>
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
								<h2>Catalog</h2>
								<ul>
									<li>COFFEE MAKER</li>
									<li>DEEP FRYER</li>
									<li>Microwave</li>
								</ul>
								<h2>Price</h2>
								<input type="number" defaultValue="0 - 200kr"/>
								<h2>Colors</h2>
								<ul>
									<li>Black</li>
									<li>Red</li>
									<li>Purple</li>
								</ul>
							</aside>
							<div className="itemDisplayWrapper">
								<div className="filter">SORT BY:</div>
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
