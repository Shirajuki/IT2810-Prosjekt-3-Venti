import mongoose from "mongoose";

const productSchema = mongoose.Schema({
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
  }
  );

// module.exports = mongoose.model('product', productSchema);
export default mongoose.model('product', productSchema);

