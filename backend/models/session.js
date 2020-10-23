const mongoose = require('mongoose')

const sessionSchema = mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},
	cart: {
		type: String,
	}
}
);

module.exports = mongoose.model('session', sessionSchema);

