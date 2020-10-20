import React from "react";
import Items from './Items';
interface IProps {
	modal: {title: string},
	setModal: (title:string) => void;
}
function Modal( props: IProps ) {
	return (
		<div
			className={`modalContainer ${props.modal.title === "none" ? "hidden" : "shown"}`}
		>
			<div className="modalContent">
				<div className="modalHeader">
					<div className="closeBtn" onClick={() => props.setModal("none")}>
						&#10006;
					</div>
				</div>
				<Items title={props.modal.title} onClick={() => void(0)}/>
			</div>
		</div>
	);
}

export default Modal;

