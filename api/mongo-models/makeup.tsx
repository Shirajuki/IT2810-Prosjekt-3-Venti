const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const makeupSchema = new Schema({
  name: String,
  brand: String,
  image: String,
  product_type: String,
  description: String,
  product_colors: Array
}
);

module.exports = mongoose.model("product", makeupSchema);
