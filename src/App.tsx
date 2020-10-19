import React from 'react';
import './App.css';
import Items from './components/Items';
import Carousel from './components/Carousel';
import ItemDisplay from './components/ItemDisplay';
function App() {
	return (
		<>
		<div className="divWrapper">
			<header id="nav">
				<nav>
					<h3>logo</h3>
					<a><h2>TECHNIQUE</h2></a>
					<div>
						<a>O</a>
						<a>R</a>
						<a>X</a>
					</div>
				</nav>
			</header>
			<main>
				<div className="splash">
					<div className="splashEye">
						<h1>A wonderful serenity has taken <br/><span>possesion of my entire soul.</span></h1>
						<button>SHOW ITEM</button>
						<img src="splash.png"/>
					</div>
				</div>
				<img src="https://images.glambot.com/ecb85e680c3f74ad2cb573f02e214736?q=80"/>
				<div className="section">
					<h1>NYHETER</h1>
					<Carousel />
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
							<ItemDisplay />
							<div className="itemNavigation">- 1 2 3 .. 20 -</div>
						</div>
					</div>
				</div>
				<img src="https://vita.wpcloud.trollweb.no/default/wp-content/wpcloud_cache/imageintervention/2/xfrifrakt-1440x150-198450-JJLiEGie-3984026395.jpg.pagespeed.ic.M7T-yQTSBo.jpg"/>
			</main>
			<footer>
				<div className="footerWrapper">
					<div className="us">
						<a>NEWS</a>
						<a>ABOUT US</a>
						<a>CATALOG</a>
						<a>CONTACTS</a>
						<a>FAQ</a>
					</div>
					<div className="social">
						<h2>TECHNIQUE</h2>
						<div>
							<a>O</a>
							<a>N</a>
							<a>Y</a>
							<a>X</a>
						</div>
					</div>
					<div className="info">
						<h2>Website designed by:</h2>
						<p>Team7</p>
					</div>
				</div>
			</footer>
		</div>
	</>
	);
}

export default App;
