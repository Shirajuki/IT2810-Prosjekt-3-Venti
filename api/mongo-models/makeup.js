const { GraphQLID } = require("graphql");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const makeupSchema = new Schema({
  name: String,
  brand: String,
  image: String,
  product_type: String,
  description: String,
  product_colors: Array
},
{ timestamps: true },
);

module.exports = mongoose.model("makeup", makeupSchema);
