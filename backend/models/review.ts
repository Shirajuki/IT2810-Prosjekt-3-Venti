import mongoose from "mongoose";
import { ReviewDoc } from "./modelDoc";
const reviewSchema = new mongoose.Schema({
    productId: {
        type: Number,
        required: true,
	},
	sessionId: {
		type: String,
		required: true,
	},
    name: {
        type: String,
        required: true,
    },
    reviewText: {
        type: String,
        required: true,
	}
  }
  );

// module.exports = mongoose.model('product', productSchema);
export default mongoose.model<ReviewDoc>('review', reviewSchema);
