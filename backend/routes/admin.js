const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getIndex);

router.post('/editCart/:productId', adminController.postEditCart);

router.post('/removeCart/:productId', adminController.postRemoveProductFromCart);

router.get('/add-product', adminController.getAddProduct);

router.get('/search-products/:searchTerm', adminController.searchProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.get('/filter-products/:filterTerm', adminController.filterProducts);

router.get('/sort-products/:sortTerm', adminController.sortProducts);

router.post('/add-product', adminController.postProduct);

router.post('/edit-product', adminController.postEditProduct);

router.get('/:productId', adminController.getProduct);

router.post('/delete/:productId', adminController.postDelete);

module.exports = router;
