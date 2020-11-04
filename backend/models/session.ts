import mongoose from "mongoose";
import { SessionDoc } from "./modelDoc";
const sessionSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	reviewRating: {
        type: Array,//[{id: Number, stars: Number}],
        default: [],
        required: true,
    },
	cart: {
		type: String,
	}
}
);

// module.exports = mongoose.model('session', sessionSchema);
export default mongoose.model<SessionDoc>("session", sessionSchema);

