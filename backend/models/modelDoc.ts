import mongoose from "mongoose";

export interface ProductDoc extends mongoose.Document {
	name: string,
    brand: string,
    image: string,
	price: string,
    product_type: string,
    description: string,
    product_colors: String[]
}
export interface SessionDoc extends mongoose.Document {
	_id: string,
	cart: string,
	_doc: {
		cart: string
	}
}

export interface ReviewDoc extends mongoose.Document {
	_id: string,
	productId: number,
	name: string,
	review: string,
}
