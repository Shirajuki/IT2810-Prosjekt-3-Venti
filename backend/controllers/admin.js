const Product = require('../models/product');
const Session = require('../models/session');

exports.getIndex = async (req, res) => {
	const product = await Product.find((data) => data);
	const sessionDB = await Session.find((data) => data);
	const session = sessionDB.filter(e => e._id === req.sessionID);
	if (session.length > 0) {
		console.log("Welcome back",req.sessionID);
		console.log(session[0]._doc.cart);
		if (session[0]._doc?.cart == undefined) {
			product.push('[]');
			const update = await Session.findOneAndUpdate(
			    { _id: req.sessionID },
				{ cart: "[]" },
				{ multi: true },
			);
			console.log(update);
		} else {
			product.push(session[0]._doc.cart);
		}
	}
    try {
		//console.log(product);
        res.json(product);
    } catch (error) {
        console.log(error);
    }
};

exports.postRemoveProductFromCart = async (req, res) => {
    const productId = req.params.productId;
	if (!productId) return res.status(200);
	const sessionDB = await Session.find((data) => data);
	const session = sessionDB.filter(e => e._id === req.sessionID);
	const cart = JSON.parse(session[0]?._doc?.cart) || [];
	let indexProduct = -1;
	for (let i=0; i<cart.length; i++) {
		if (cart[i][0] == productId) {
			indexProduct = i;
			break;
		}
	}
	if (indexProduct !== -1) {
		cart[indexProduct][1]--;
		if (cart[indexProduct][1] == 0) cart.splice(indexProduct, 1);
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
exports.postEditCart = async (req, res) => {
    const productId = req.params.productId;
	if (!productId) return res.status(200);
	const sessionDB = await Session.find((data) => data);
	const session = sessionDB.filter(e => e._id === req.sessionID);
	const cart = JSON.parse(session[0]?._doc?.cart) || [];
	let indexProduct = -1;
	for (let i=0; i<cart.length; i++) {
		if (cart[i][0] == productId) {
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
exports.getProduct = async (req, res) => {
    const productId = req.params.productId;
	const product = await Product.find({id: productId}, (product) => product);
    try {
        console.log(product);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
    }
};

exports.getAddProduct = (req, res) => {
    res.status(200).render('edit-product', { editing: false });
};

exports.getEditProduct = async (req, res) => {
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
        res.status(200).render('edit-product', { product: product, editing: editMode });
    } catch (error) {
        console.log(error);
    }
};

exports.postProduct = (req, res) => {
    const { name, brand, image_link, product_type, description, price } = req.body;

    const product = new Product({ name: name, brand: brand, image_link: image_link, product_type: product_type, description: description, price: price });
    product.save();
    console.log('Product Added to the database');
    res.status(201).redirect('http://localhost:3000/');
};

exports.postEditProduct = (req, res) => {
    const productId = req.body.productId;
    const { name, brand, image_link, product_type, description, price } = req.body;

    Product.findById(productId)
        .then((product) => {
            product.name = name;
            product.brand = brand;
            product.image_link = image_link;
            product.description = description;
            product.product_type = product_type;
            product.price = price;
            return product.save();
        })
        .then(() => {
            console.log('Item Updated');
            res.status(201).redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postDelete = async (req, res) => {
    const productId = req.body.productId;

    const product = await Product.findByIdAndRemove(productId, (data) => data);

    try {
        console.log(product);
        console.log('Item Deleted');
        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
};
