import Product from "../models/product";
import Session from "../models/session";
import { Request, Response } from 'express';
import { ProductDoc, SessionDoc } from "../models/modelDoc";

const getIndex = async (req: Request, res: Response) => {
	const product = await Product.find((data) => data); // object
	const sessionDB = await Session.find((data) => data);
	const session = sessionDB.filter(e => e._id === req.sessionID);
	let final: any[] = [];
	if (session.length > 0) {
		console.log("Welcome back",req.sessionID);
		console.log(session[0]._doc.cart);
		if (session[0]._doc?.cart === undefined) {
			final = [...product, '[]'];
			const update = await Session.updateOne(
			    { _id: req.sessionID },
				{ cart: "[]" },
				{ multi: true },
			);
			console.log(update);
		} else {
			final = [...product,session[0]._doc.cart];
		}
	} else {
		final = [...product, '[]'];
	}
    try {
		console.log(final[final.length-1]);
		res.json(final);
    } catch (error) {
        console.log(error);
    }
};

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
const postEditCart = async (req: Request, res: Response) => {
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

const filterProducts = async (req: Request, res: Response) => {
	const filterTerm: string = req.params.filterTerm;

    const product = await Product.find((data) => data)

	const propComparator = (prop: string) => {
		return (a: ProductDoc, b: ProductDoc) => {
            return a.get(prop) - b.get(prop);
        }
    }

    product.sort(propComparator(filterTerm));

    try {
        console.log(product);
        res.status(200)
        res.send(JSON.stringify(product))
    } catch (error) {
        console.log(error);
    }
};

const searchProducts = async (req: Request, res: Response) => {
    const searchTerm = req.params.searchTerm;

    const product = await Product.find( { $text: { $search: searchTerm } } )

    try {
        // console.log(product);
        res.status(200)
        res.send(JSON.stringify(product))
    } catch (error) {
        console.log(error);
    }
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
	getIndex: getIndex,
	postRemoveProductFromCart: postRemoveProductFromCart,
	postEditCart: postEditCart,
	postProduct: postProduct,
	getProduct: getProduct,
	filterProducts: filterProducts,
	searchProducts: searchProducts,
	getAddProduct: getAddProduct,
	getEditProduct: getEditProduct,
	postDelete: postDelete,
};
