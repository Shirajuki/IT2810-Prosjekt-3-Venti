import Product from "../models/product";
import Session from "../models/session";
import Review from "../models/review";
import { Request, Response } from 'express';
import { ProductDoc, ReviewDoc, SessionDoc } from "../models/modelDoc";

const getIndex = async (req: Request, res: Response) => {
	const {pageSize = 15, pageOffset = 0} = req.query;
	const sortTerm: string = req.query.sortTerm as string;
	const filterTerm: string = req.query.filterTerm as string;
	const term: any = {}
	// Get product listing by sortTerm, filterTerm, searchTerm? and amount of products wanted
	// Sorting
	if (sortTerm) {
		const sterm: string[] = sortTerm.split("_");
		term[sterm[0]] = sterm[1]
	} else {
		term["name"] = "asc";
	}
	// Filtering
	let fterm: String[] = []
	if (filterTerm) {
		fterm = JSON.parse(filterTerm).map((e: string) => e.split("="));
	}
	const filterQuery:any = {};
	for (let i=0; i<fterm.length; i++) {
		if (filterQuery[fterm[i][0]]?.$in) {
			filterQuery[fterm[i][0]].$in = [...filterQuery[fterm[i][0]].$in, fterm[i][1]];
		} else {
			filterQuery[fterm[i][0]] = {$in: [fterm[i][1]]};
		}
	}
	// Searchs
	const searchTerm: string = req.query.searchTerm as string;
	let products: ProductDoc[] = [];
	let productCount: ProductDoc[] = [];
	if (searchTerm) {
		products = await Product.find({ $text: { $search: searchTerm }, ...filterQuery}).sort(term).skip(+pageOffset*+pageSize).limit(+pageSize);;
		productCount = await Product.find({ $text: { $search: searchTerm }, ...filterQuery}).sort(term);
	} else {
		products = await Product.find(filterQuery).sort(term).skip(+pageOffset*+pageSize).limit(+pageSize);;
		productCount = await Product.find(filterQuery).sort(term);
	}
	let count: string = req.query.count as string;
	try {
		if (count == "true") {
			res.json({count: productCount.length});
		} else {
			res.json(products);
		}
	} catch (error) {
		console.log(error);
	}
};

const countProducts = async (_: Request, res: Response) => {
	const count = await Product.countDocuments()
	try {
		res.status(200)
		res.send(JSON.stringify({count}))
	} catch (error) {
		console.log(error);
	}
}

const getGetCart = async (req: Request, res: Response) => {
	const sessionDB = await Session.find((data) => data);
	const session: SessionDoc[] = sessionDB.filter(e => e._id === req.sessionID);
	// Sends an array of productIds and their total values, and an array of the products
	let final: any[] = ['[]'];
	if (session.length > 0) {
		console.log("Session",req.sessionID, "connected!");
		// If it's a new session, we initialize an empty cart
		if (!session[0]._doc?.cart) {
			await Session.updateOne(
				{ _id: req.sessionID },
				{ cart: '[]' },
				{ multi: true },
			);
		} else {
			final = [session[0]._doc.cart];
		}
	}
	try {
		// Sends both arrays as a response
		const productsId: Number[] = JSON.parse(final[0]).map((arr: string[]) => Number(arr[0]));
		const products: ProductDoc[] = await Product.find({"id": {$in: productsId}});
		final = [...final, products];
		try {
			res.json(final);
		} catch (error) {
			console.log(error);
		}
	} catch (err){
		return res.json(['[]',[]]);
	}

};
const postDeleteCart = async (req: Request, res: Response) => {
	const productId = req.params.productId;
	if (!productId) return res.status(202);
	const sessionDB = await Session.find((data) => data);
	const session: SessionDoc[] = sessionDB.filter(e => e._id === req.sessionID);
	const cart: string[] = JSON.parse(session[0]?._doc?.cart) || [];
	// Parse cart as an array and loops through finding the index to delete product from cart
	let indexProduct = -1;
	for (let i=0; i<cart.length; i++) {
		if (cart[i][0] === productId) {
			indexProduct = i;
			break;
		}
	}
	if (indexProduct !== -1) {
		cart.splice(indexProduct, 1);
	} else {
		res.status(201);
	}
	try {
		if (session.length > 0) {
			await Session.findOneAndUpdate(
				{ _id: req.sessionID },
				{ cart: JSON.stringify(cart) },
				{ new: true },
			);
		}
		res.status(200);
	} catch (error) {
		console.log(error);
	}
};
const postRemoveCart = async (req: Request, res: Response) => {
	const productId = req.params.productId;
	if (!productId) return res.status(202);
	const sessionDB = await Session.find((data) => data);
	const session = sessionDB.filter(e => e._id === req.sessionID);
	// Parse cart as an array and loops through finding the index to either delete or decrement value in cart
	const cart: any[] = JSON.parse(session[0]?._doc?.cart) || [];
	let indexProduct = -1;
	for (let i=0; i<cart.length; i++) {
		if (cart[i][0] === productId) {
			indexProduct = i;
			break;
		}
	}
	if (indexProduct !== -1) {
		cart[indexProduct][1]--;
		if (cart[indexProduct][1] === 0) cart.splice(indexProduct, 1);
	} else {
		res.status(201);
	}
	try {
		if (session.length > 0) {
			await Session.findOneAndUpdate(
				{ _id: req.sessionID },
				{ cart: JSON.stringify(cart) },
				{ new: true },
			);
		}
		res.status(200);
	} catch (error) {
		console.log(error);
	}
};
const postEditCart = async (req: Request, res: Response) => {
	const productId = req.params.productId;
	if (!productId) return res.status(202);
	const sessionDB = await Session.find({});
	const session: SessionDoc[] = sessionDB.filter(e => e._id === req.sessionID);
	// Get cart as string
	let sCart: string = session[0]?._doc?.cart || '[]';
	// Parse cart as an array and loops through finding the index to either add as new or increment value in cart
	let cart: any[] = JSON.parse(sCart);
	if (typeof cart === "string") cart = [];
	let indexProduct = -1;
	for (let i=0; i<cart.length; i++) {
		if (cart[i][0] === productId) {
			indexProduct = i;
			break;
		}
	}
	if (indexProduct !== -1) {
		cart[indexProduct][1]++;
	} else {
		cart.push([productId,1])
	}
	try {
		if (session.length > 0) {
			await Session.findOneAndUpdate(
				{ _id: req.sessionID },
				{ cart: JSON.stringify(cart) },
				{ new: true },
			);
		}
		res.status(201);
	} catch (error) {
		console.log(error);
	}
};
const postUpdateCart = async (req: Request, res: Response) => {
	// Updates the cart given a stringified array
	const nCart = req.params.cart;
	try {
		if (nCart) {
			await Session.findOneAndUpdate(
				{ _id: req.sessionID },
				{ cart: JSON.stringify(nCart) },
				{ new: true },
			);
		}
		res.status(201);
	} catch (error) {
		console.log(error);
		res.status(202);
	}

};
const getProduct = async (req: Request, res: Response) => {
	const productId = req.params.productId;
	const product: ProductDoc = await Product.findOne({id: +productId});
	try {
		res.status(200).json(product);
	} catch (error) {
		console.log(error);
	}
};

const getReviews = async (req: Request, res: Response) => {
	const productId = req.params.productId;
	const reviews: ReviewDoc[] = await Review.find({productId: +productId});
	try {
		res.status(200).json(reviews);
	} catch (error) {
		console.log(error);
	}
};

const postReview = async (req: Request, res: Response) => {
	const productId: string = req.query.productId as string;
	const name: string = req.query.name as string;
	const sessionId: string = req.query.sessionId as string;
	const reviewText: string = req.query.reviewText as string;
	const stars: string = req.query.stars as string;
	const review: ReviewDoc = new Review({productId, sessionId, name, reviewText, stars});
	let averageRating: number = Number(stars);
	const reviews: ReviewDoc[] = await Review.find({productId: +productId});
	// Calculate averageRating of product
	for (const map of reviews) {
		averageRating += map.stars;
	}
	averageRating = averageRating/(reviews.length+1)
	// Map to [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]
	const floored: number = Math.floor(averageRating);
	if (averageRating > floored) {
		averageRating = floored+0.5;
	} else{ 
		averageRating = floored;
	}
	// Insert new review
	review.save((err: any) =>{
		if (err) return res.status(404).json({status:404});
	})
	// Update products averageRating
	await Product.findOneAndUpdate(
		{ id: +productId },
		{ rating: +averageRating },
		{ new: true },
	);
	return res.status(200).json({status:200});
};

export default {
	getIndex,
	countProducts,
	postRemoveCart,
	postDeleteCart,
	getGetCart,
	postEditCart,
	postUpdateCart,
	getProduct,
	getReviews,
	postReview,
};
