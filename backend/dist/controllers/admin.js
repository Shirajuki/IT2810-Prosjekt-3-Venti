"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../models/product"));
const session_1 = __importDefault(require("../models/session"));
exports.getIndex = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const product = yield product_1.default.find((data) => data); // object
    const sessionDB = yield session_1.default.find((data) => data);
    console.log(typeof sessionDB);
    const session = sessionDB.filter(e => e._id === req.sessionID);
    console.log(typeof session);
    if (session.length > 0) {
        console.log("Welcome back", req.sessionID);
        console.log(session[0]._doc.cart);
        if (((_a = session[0]._doc) === null || _a === void 0 ? void 0 : _a.cart) === undefined) {
            product.push('[]');
            const update = yield session_1.default.findOneAndUpdate({ _id: req.sessionID }, { cart: "[]" }, { multi: true });
            console.log(update);
        }
        else {
            product.push(session[0]._doc.cart);
        }
    }
    try {
        // console.log(product);
        res.json(product);
    }
    catch (error) {
        console.log(error);
    }
});
exports.postRemoveProductFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    const productId = req.params.productId;
    if (!productId)
        return res.status(200);
    const sessionDB = yield session_1.default.find((data) => data);
    const session = sessionDB.filter(e => e._id === req.sessionID);
    const cart = JSON.parse((_c = (_b = session[0]) === null || _b === void 0 ? void 0 : _b._doc) === null || _c === void 0 ? void 0 : _c.cart) || [];
    let indexProduct = -1;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i][0] === productId) {
            indexProduct = i;
            break;
        }
    }
    if (indexProduct !== -1) {
        cart[indexProduct][1]--;
        if (cart[indexProduct][1] === 0)
            cart.splice(indexProduct, 1);
    }
    else {
        res.status(200);
    }
    console.log("Removed the product", productId);
    try {
        if (session.length > 0) {
            yield session_1.default.findOneAndUpdate({ _id: req.sessionID }, { cart: JSON.stringify(cart) }, { new: true });
        }
        res.status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.postEditCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e;
    const productId = req.params.productId;
    if (!productId)
        return res.status(200);
    const sessionDB = yield session_1.default.find((data) => data);
    const session = sessionDB.filter(e => e._id === req.sessionID);
    const cart = JSON.parse((_e = (_d = session[0]) === null || _d === void 0 ? void 0 : _d._doc) === null || _e === void 0 ? void 0 : _e.cart) || [];
    let indexProduct = -1;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i][0] === productId) {
            indexProduct = i;
            break;
        }
    }
    if (indexProduct !== -1) {
        cart[indexProduct][1]++;
    }
    else {
        cart.push([productId, 1]);
    }
    console.log("Added the product", productId);
    console.log();
    try {
        if (session.length > 0) {
            yield session_1.default.findOneAndUpdate({ _id: req.sessionID }, { cart: JSON.stringify(cart) }, { new: true });
        }
        res.status(200);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const product = yield product_1.default.find({ id: productId });
    try {
        console.log(product);
        res.status(200).json(product);
    }
    catch (error) {
        console.log(error);
    }
});
exports.filterProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterTerm = req.params.filterTerm;
    const product = yield product_1.default.find((data) => data);
    const propComparator = prop => {
        return (a, b) => {
            return a[prop] - b[prop];
        };
    };
    product.sort(propComparator(filterTerm));
    try {
        console.log(product);
        res.status(200);
        res.send(JSON.stringify(product));
    }
    catch (error) {
        console.log(error);
    }
});
exports.searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.params.searchTerm;
    const product = yield product_1.default.find({ $text: { $search: searchTerm } });
    try {
        // console.log(product);
        res.status(200);
        res.send(JSON.stringify(product));
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAddProduct = (req, res) => {
    res.status(200).render('edit-product', { editing: false });
};
exports.getEditProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const product = yield product_1.default.findById(productId);
    try {
        if (!productId) {
            return res.redirect('/');
        }
        console.log(product);
        res.status(200).render('edit-product', { product, editing: editMode });
    }
    catch (error) {
        console.log(error);
    }
});
exports.postProduct = (req, res) => {
    const { name, brand, image_link, product_type, description, price } = req.body;
    const product = new product_1.default({ name, brand, image_link, product_type, description, price });
    product.save();
    console.log('Product Added to the database');
    res.status(201).redirect('http://localhost:3000/');
};
exports.postEditProduct = (req, res) => {
    const productId = req.body.productId;
    const { name, brand, image_link, product_type, description, price } = req.body;
    product_1.default.findById(productId)
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
exports.postDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const product = yield product_1.default.findByIdAndRemove(productId, (data) => data);
    try {
        console.log(product);
        console.log('Item Deleted');
        res.redirect('/');
    }
    catch (error) {
        console.log(error);
    }
});
//# sourceMappingURL=admin.js.map