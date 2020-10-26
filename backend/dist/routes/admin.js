"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = __importDefault(require("../controllers/admin"));
const router = express_1.default.Router();
router.get("/", admin_1.default.getIndex);
router.post("/editCart/:productId", admin_1.default.postEditCart);
router.post("/removeCart/:productId", admin_1.default.postRemoveProductFromCart);
router.get("/add-product", admin_1.default.getAddProduct);
router.get("/filter-product/:filterTerm", admin_1.default.filterProducts);
router.get("/search-products/:searchTerm", admin_1.default.searchProducts);
router.get("/edit-product/:productId", admin_1.default.getEditProduct);
router.post("/add-product", admin_1.default.postProduct);
router.post("/edit-product", admin_1.default.postEditProduct);
router.get("/:productId", admin_1.default.getProduct);
router.post("/delete/:productId", admin_1.default.postDelete);
// module.exports = router;
exports.default = router;
//# sourceMappingURL=admin.js.map