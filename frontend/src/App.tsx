import React, { Fragment, useEffect, useState } from 'react';
import Product from "./models/product"
import Carousel from './components/Carousel';
import ItemDisplay from './components/ItemDisplay';
import Modal from './components/Modal';

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
    const [loading, setLoading] = useState(true);

	return (
		<>
			<div className="divWrapper">
				<header id="nav">
					<nav>
						<h3>logo</h3>
						<button><h2>TECHNIQUE</h2></button>
						<div>
							<button>🔎</button>
							<button>🛒</button>
						</div>
					</nav>
				</header>
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
								<input type="number" value="0 - 200kr"/>
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
