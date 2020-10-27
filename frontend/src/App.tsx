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
                console.log(data);
                setLoading(false);
				const cart = data.pop();
				setCart(""+cart);
                setProduct(data);
				let cookie = Cookies.get("connect.sid")||"none";
				if (cookie !== "none") cookie = cookie.split(".")[0].substring(2);
				setSession({sessionID: cookie});
            } catch (error) {
                console.log(error);
            }
        };
        getAPI();
    }, []);
	const [cart, setCart] = useState<string>("[]");
	const [session, setSession] = useState({
		sessionID: "none",
	});
	function editCart(productId: number = -1) {
		let nCart = JSON.parse(cart);
		let rndProduct = ""+product[Math.floor(Math.random() * product.length)].id;
		if (productId !== -1) {
			rndProduct = ""+productId;
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
    const [product, setProduct] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
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
				<div className="searchResults" style= {{display:(searched ? "block" : "none")}}>
				{searchResult.map(item => (
					<Items id={item.id} img={item.image_link} name={item.name} description={item.description} price={item.price} isCarousel={false} onClick={() => console.log("Hei")} isModal = {true} />
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
								<input type="number" defaultValue="0" placeholder="0 - 200kr"/>
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
