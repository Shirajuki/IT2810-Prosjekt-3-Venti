"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    product_type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    product_colors: Array
});
// module.exports = mongoose.model('product', productSchema);
exports.default = mongoose_1.default.model('product', productSchema);
//# sourceMappingURL=product.js.map