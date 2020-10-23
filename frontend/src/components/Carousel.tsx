import React, { Component } from "react";
import Items from './Items';
type slideType = {
	id: string;
}
interface IProps {
	setModal: (id:string) => void;
}
interface CarouselProps {
	slides: slideType[];
	setModal: (id:string) => void;
}
interface CarouselState {
	count: number;
}
class Slide extends Component<CarouselProps,CarouselState> {
	constructor(props: CarouselProps) {
		super(props);
		this.state = {count: 0};
	}
	changeSlide(n: number) {
		if (this.state.count === 0 && n < 0) {
			this.setState({count: (3-1)});
		} else {
			this.setState({count: (this.state.count+n)%3});
		}
	}
	setSlide(n: number) {
		this.setState({count: n});
	}
	render() {
		return (
			<div className="carousel">
				<button className="prev" onClick={() => this.changeSlide(-1)}>&lt;</button>
				<button className="next" onClick={() => this.changeSlide(1)}>&gt;</button>
				<Display count={this.state.count} slides={this.props.slides} setModal={this.props.setModal}/>
				<p style={{position: "absolute", top: 0, right: 0}}>{this.state.count}</p>
			</div>
		);
	}
}
function splitArray(array: slideType[],chunk: number) {
	const nArray: slideType[][] = [];
	let nsplit: slideType[] = [];
	for (let i=0; i<array.length; i++) {
		if (i > 0 && i%chunk === 0) {
			nArray.push([...nsplit]);
			nsplit = [];
		}
		nsplit.push(array[i]);
	}
	if (nsplit.length !== 0) {
		for (let i=0; i<array.length; i++) {
			if (i > 0 && i%chunk === 0) {
				nArray.push([...nsplit]);
				nsplit = [];
				break
			}
		}
	}
	nArray.push([...nsplit]);
	return nArray;
}
const Display = (props: {count: number, slides: slideType[], setModal: (id:string) => void}) => {
	const arr: slideType[][] = splitArray(props.slides, 5)
	/*return (
	<>
		{arr[props.count].map((slide) => {
			return (<Items id={slide.id} onClick={() => props.setModal(slide.id)} />);
		})}
	</>
	);*/
	return (<></>);
}
const slides: slideType[] = [
	{
		id: "newest",
	},
	{
		id: "",
	},
	{
		id: "",
	},
	{
		id: "",
	},
	{
		id: "",
	},
	{
		id: "",
	},
	{
		id: "newest",
	},
	{
		id: "newest",
	},
	{
		id: "newest",
	},
	{
		id: "newest",
	},
	{
		id: "",
	},
	{
		id: "",
	},
	{
		id: "newest",
	},
	{
		id: "",
	},
	{
		id: "newest",
	},
];
function Carousel( props: IProps ) {
	return(<></>)
	/*return (
		<Slide slides={slides} setModal={props.setModal}/>
	);*/
}
/*

function Carousel() {
	const [data, setData] = useState([]);
	
	useEffect(() => {
	}, []);

}
*/
export default Carousel;
