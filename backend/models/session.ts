import mongoose from "mongoose";
import { SessionDoc } from "./modelDoc";
const sessionSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	cart: {
		type: String,
	}
}
);
export default mongoose.model<SessionDoc>("session", sessionSchema);

