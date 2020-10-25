const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getIndex);

router.get('/add-product', adminController.getAddProduct);

router.get('/filter-product/:filterTerm', adminController.filterProducts);

router.get('/search-products/:searchTerm', adminController.searchProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/add-product', adminController.postProduct);

router.post('/edit-product', adminController.postEditProduct);

router.get('/:productId', adminController.getProduct);

router.post('/delete/:productId', adminController.postDelete);

module.exports = router;
