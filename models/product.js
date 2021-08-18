const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        uppercase: true,
        enum: ['MEN', 'WOMEN', "KIDS"],
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
      imgURL:{
          type:String,
          required:true,
      },
      about:{
        type: String,
        required: true,
      },

});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;