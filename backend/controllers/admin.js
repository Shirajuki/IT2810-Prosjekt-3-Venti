const Product = require('../models/product');
const mongoose = require('mongoose');

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
    if(mongoose.Types.ObjectId.isValid(productId)) {
    const product = await Product.findById(productId, (product) => product);
    
    try {
        res.status(200)
        console.log(product);
        res.send(JSON.stringify(product));
    } catch (error) {
        console.log(error);
    }
}
};

exports.searchProducts = async (req, res) => {
    const searchTerm = req.params.searchTerm;

    const product = await Product.find( { $text: { $search: searchTerm } } )

    try {
        console.log(product);
        res.status(200)
        res.send(JSON.stringify(product))
    } catch (error) {
        console.log(error);
    }
};

exports.filterProducts = async (req, res) => {
    const filterTerm = req.params.filterTerm;
    const filter = req.query.filter;
    const filterOn = req.query.filterOn;
    
    const str = filterTerm.map(e => e.split("="));
    const Jstr = JSON.params(str.map(e => `{"${e[0]}": "${e[1]}"}`).join().split("},{").join(", "))


    if (filterTerm.length > 0){
            filterQuery = {
                Jstr
            }
        }

    const product = await Product.find(filterQuery)

    try {
        console.log(product);
        res.status(200)
        res.send(JSON.stringify(product))
    } catch (error) {
        console.log(error);
    }
}; 

exports.sortProducts = async (req, res) => {
    const sortTerm = req.params.sortTerm;
    /*const sortBy = req.query.sortBy || 'name';
    const OrderBy = req.query.OrderBy || 'asc';
    const sortQuery = {
        [sortTerm] : type
    };*/

    const product = await Product.find((data) => data)

    function propComparator(prop) {
        if(req.query.sortBy && req.query.OrderBy){
            const str = req.query.sortBy.split("_");
            sort[str[0]] = str[1] === 'desc' ? -1 : 1
        }
    }

    product.sort(propComparator(sortTerm));

    try {
        console.log(product);
        res.status(200)
        res.send(JSON.stringify(product))
    } catch (error) {
        console.log(error);
    }
}

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