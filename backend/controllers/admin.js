const Product = require('../models/product');

exports.getIndex = async (req, res) => {
    const product = await Product.find((data) => data);

    try {
        //console.log(product);
        res.json(product);
    } catch (error) {
        console.log(error);
    }
};

exports.getProduct = async (req, res) => {
    const productId = req.params.productId;

    const product = await Product.findById(productId, (product) => product);

    try {
        console.log(product);
        res.status(200).render('product', { product: product });
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