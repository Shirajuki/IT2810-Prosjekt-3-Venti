import React from "react";
import Items from './Items';
//Declares type of title
type slideType = {
	title: string;
}
interface IProps {
	title: string;
	setModal: (title:string) => void;
}
const items: slideType[] = [
	{
		title: "newest",
	},
	{
		title: "",
	},
	{
		title: "",
	},
	{
		title: "",
	},
	{
		title: "",
	},
	{
		title: "",
	},
	{
		title: "newest",
	},
];
function ItemDisplay(props: IProps) {
	return (
	<>
		<div className="itemDisplay">
			{items.map((item) => {
				return (<Items title={item.title} onClick={() => props.setModal(item.title)} />);
			})}
		</div>
	</>
	);
}

export default ItemDisplay;
