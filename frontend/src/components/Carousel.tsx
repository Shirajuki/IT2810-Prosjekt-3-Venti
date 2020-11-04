import React, { useState } from "react";
import { observable, toJS } from "mobx"
import { observer, useAsObservableSource } from "mobx-react-lite"
import { useEffect } from "react";
import Product from "../models/product";
import Items from './Items';

interface IProps {
	setModal: (id:string, product:Product) => void;
}
interface CarouselProps {
	slides: Product[];
	setModal: (id:string, product:Product) => void;
}
interface CarouselState {
	count: number;
}
const Slide = observer((props: CarouselProps) => {
	const slides = useAsObservableSource(props.slides);
	const [state] = useState(() =>
		observable({
			// Observables
			count: 0,
			maxStates: 3,
			chunk: 5,
			slides: slides,
			// Actions
			setState(data: CarouselState) {
				this.count = data.count;
			},
			changeSlide(n: number) {
				if (this.count === 0 && n < 0) {
					this.setState({count: (this.maxStates-1)});
				} else {
					this.setState({count: (this.count+n)%this.maxStates});
				}
			},
			// Computed values
			get displaySlides() {
				const nArray: Product[][] = [];
				let nsplit: Product[] = [];
				for (let i=0; i<props.slides.length; i++) {
					if (i > 0 && i%this.chunk === 0) {
						nArray.push([...nsplit]);
						nsplit = [];
					}
					nsplit.push(props.slides[i]);
				}
				if (nsplit.length !== 0) {
					for (let i=0; i<props.slides.length; i++) {
						if (i > 0 && i%this.chunk === 0) {
							nArray.push([...nsplit]);
							nsplit = [];
							break
						}
					}
				}
				nArray.push([...nsplit]);
				return toJS(nArray[this.count]);
			}
		})
	)
	return (
		<div className="carousel">
			<button className="prev" onClick={() => state.changeSlide(-1)}>&lt;</button>
			<button className="next" onClick={() => state.changeSlide(1)}>&gt;</button>
			<Display slides={state.displaySlides} setModal={props.setModal}/>
		</div>
	);
})
const Display = observer((props: {slides: Product[], setModal: (id:string, product:Product) => void}) => {
	const slides = useAsObservableSource(props.slides);

	return (
		<>
			{slides.map((slide) => {
				return (<Items id={slide.id} img={slide.image_link} name={slide.name} description={slide.description} rating={slide.rating} price={slide.price} type="carousel" onClick={() => props.setModal(slide.id, slide)} />);
			})}
		</>
	);
})

const Carousel = observer((props: IProps) => {
	const [product] = useState(() =>
		observable({
			list: [],
			setProduct(data: Product[]) {
				this.list = data.concat();
			}
		})
	)
	useEffect(() => {
		const getAPI = async () => {
			const response = await fetch('http://localhost:8080/');
			const data = await response.json();
			try {
				product.setProduct(data);
			} catch (error) {
				console.log(error);
			}
		};
		getAPI();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<Slide slides={product.list} setModal={props.setModal}/>
		</>
	);

})

export default Carousel;
