"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const sessionSchema = mongoose_1.default.Schema({
    _id: {
        type: String,
        required: true,
    },
    cart: {
        type: String,
    }
});
// module.exports = mongoose.model('session', sessionSchema);
exports.default = mongoose_1.default.model("session", sessionSchema);
//# sourceMappingURL=session.js.map