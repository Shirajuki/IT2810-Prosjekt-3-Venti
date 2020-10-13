const { GraphQLID } = require("graphql");
const mongo = require("mongoose");
const Schema = mongo.Schema;

const makeupSchema = new Schema({
  id: String,
  name: String,
  brand: String,
  image: String,
  product_type: String,
});

module.exports = mongo.model("makeup", makeupSchema);
