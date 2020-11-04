import mongoose from "mongoose";

interface ISession {
	productId: number,
	stars: number
}

export interface ProductDoc extends mongoose.Document {
	name: string,
    brand: string,
    image_link: string,
	price: string,
    product_type: string,
	rating: number,
	description: string,
    product_colors: String[]
}
export interface SessionDoc extends mongoose.Document {
	_id: string,
	cart: string,
	reviewRating: ISession[],
	_doc: {
		cart: string
	}
}

export interface ReviewDoc extends mongoose.Document {
	productId: number,
	sessionId: string,
	name: string,
	reviewText: string,
	stars: number,
}
