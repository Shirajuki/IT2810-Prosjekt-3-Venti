import Product from "../models/product";
import Session from "../models/session";
import Review from "../models/review";
import { Request, Response } from 'express';
import { ProductDoc } from "../models/modelDoc";
import { type } from "os";

interface IQuery {
	pageSize: number,
	pageOffset: number,
	sortTerm: string,
}

/*
db.products.find( { "product_type": { $in: ["lipstick", "lip_liner"] },  $text: { $search: "lipliner" } } )
{{query}, {query}}
*/

const getIndex = async (req: Request, res: Response) => {
	const {pageSize = 15, pageOffset = 0} = req.query;
	const sortTerm: string = req.query.sortTerm as string;
	const filterTerm: string = req.query.filterTerm as string;
	const term: any = {}
	if (sortTerm) {
		const sterm: string[] = sortTerm.split("_");
		term[sterm[0]] = sterm[1]
	} else {
		term["name"] = "asc";
	}
	let fterm: String[] = []
	if (filterTerm) {
		fterm = JSON.parse(filterTerm).map((e: string) => e.split("="));
	}
	
	// if (filterTerm.length < 0) return res.status(200);
	const filterQuery:any = {};
	for (let i=0; i<fterm.length; i++) {
		if (filterQuery[fterm[i][0]]?.$in) {
			filterQuery[fterm[i][0]].$in = [...filterQuery[fterm[i][0]].$in, fterm[i][1]];
		} else {
			filterQuery[fterm[i][0]] = {$in: [fterm[i][1]]};
		}
	}
	//console.log("filter:",filterQuery);

	const searchTerm: string = req.query.searchTerm as string;
	// const filterProducts = await Product.find(filterQuery).sort(term).skip(+pageOffset*+pageSize).limit(+pageSize);
	let products: ProductDoc[] = [];
	let productCount: ProductDoc[] = [];
	//db.products.find( { "product_type": {$in: ["lipstick"]}, $text: { $search: "lipliner" } } )
	//db.products.find( { "product_type": { $in: ["lipstick", "lip_liner"] }, "brand": "sante", $text: { $search: "lipliner" } } )
	if (searchTerm) {
		products = await Product.find({ $text: { $search: searchTerm }, ...filterQuery}).sort(term).skip(+pageOffset*+pageSize).limit(+pageSize);;
		productCount = await Product.find({ $text: { $search: searchTerm }, ...filterQuery}).sort(term);
	} else {
		products = await Product.find(filterQuery).sort(term).skip(+pageOffset*+pageSize).limit(+pageSize);;
		productCount = await Product.find(filterQuery).sort(term);
	}
	
	//const productCount = await Product.find(filterQuery).sort(term); // object
	const sessionDB = await Session.find((data) => data);
	const session = sessionDB.filter(e => e._id === req.sessionID);
	let cart: string = req.query.cart as string;
	let count: string = req.query.count as string;
	let final: any[] = [];
	if (session.length > 0) {
		console.log("Welcome back",req.sessionID);  
		console.log(session[0]._doc.cart);
		if (!session[0]._doc?.cart) {
			final = [...products, '[]'];
			const update = await Session.updateOne(
			    { _id: req.sessionID },
				{ cart: "[]" },
				{ multi: true },
			);
			//console.log(update);
		} else {
			final = [...products,session[0]._doc.cart];
		}
	} else {
		final = [...products, '[]'];
	}
	if (cart !== "true" && final.length > 0) final.pop();
    try {
		if (count == "true") {
			console.log("smil",productCount.length);
			res.json({count: productCount.length});
		}
		else{res.json(final);}
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

const postRemoveProductFromCart = async (req: Request, res: Response) => {
    const productId = req.params.productId;
	if (!productId) return res.status(200);
	const sessionDB = await Session.find((data) => data);
	const session = sessionDB.filter(e => e._id === req.sessionID);
	const cart = JSON.parse(session[0]?._doc?.cart) || [];
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
		res.status(200);
	}
	console.log("Removed the product",productId);
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

    
const getGetCart = async (req: Request, res: Response) => {
	const sessionDB = await Session.find((data) => data);
	const session = sessionDB.filter(e => e._id === req.sessionID);
	let final: any[] = [];
	if (session.length > 0) {
		console.log("Welcome back",req.sessionID);  
		console.log(session[0]._doc.cart);
		if (!session[0]._doc?.cart) {
			final = ['[]'];
			await Session.updateOne(
			    { _id: req.sessionID },
				{ cart: "[]" },
				{ multi: true },
			);
			//console.log(update);
		} else {
			final = [session[0]._doc.cart];
		}
	} else {
		final = ['[]'];
	}
    try {
		console.log(final[final.length-1]);
		res.json(final[0]);
    } catch (error) {
        console.log(error);
    }
};

const postEditCart = async (req: Request, res: Response) => {
	const productId = req.params.productId;
	console.log(productId)
	if (!productId) return res.status(200);
	const sessionDB = await Session.find({});
	const session = sessionDB.filter(e => e._id === req.sessionID);
	console.log(req.sessionID, sessionDB.map(e => e._id), )
	const cart = JSON.parse(session[0]?._doc?.cart) || [];
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
	console.log("Added the product",productId);
	console.log()
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
const getProduct = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const product = await Product.find({id: +productId});
    try {
        console.log(product);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
};

const getReviews = async (req: Request, res: Response) => {
	const productId = req.params.productId;
	console.log(productId);
    const reviews = await Review.find({productId: +productId});
    try {
        console.log(reviews);
        res.status(200).json(reviews);
    } catch (error) {
        console.log(error);
    }
};

const postReview = (req: Request, res: Response) => {
    const {productId, name, reviewtext} = req.params;

    const review = new Product({productId, name, reviewtext });
    review.save();
    console.log('Product Added to the database');
    res.status(201).redirect('http://localhost:3000/');
};

const getAddProduct = (req: Request, res: Response) => {
    res.status(200).render('edit-product', { editing: false });
};


const getEditProduct = async (req: Request, res: Response) => {
    const productId = req.params.productId;
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const product = await Product.findById(productId);
    try {
        if (!productId) {
            return res.redirect('/');
        }
        console.log(product);
        res.status(200).render('edit-product', { product, editing: editMode });
    } catch (error) {
        console.log(error);
    }
};

const postProduct = (req: Request, res: Response) => {
    const { name, brand, image_link, product_type, description, price } = req.body;

    const product = new Product({ name, brand, image_link, product_type, description, price });
    product.save();
    console.log('Product Added to the database');
    res.status(201).redirect('http://localhost:3000/');
};

const postDelete = async (req: Request, res: Response) => {
    const productId = req.params.productId;

    const product = await Product.findByIdAndRemove(productId, (data) => data);

    try {
        console.log(product);
        console.log('Item Deleted');
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};

export default {
	getIndex,
	countProducts,
	postRemoveProductFromCart,
	getGetCart,
	postEditCart,
	postProduct,
	getProduct,
	getAddProduct,
	getEditProduct,
	postDelete,
	getReviews,
};
