const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// We create a schema for a movie
let orderSchema = Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    restaurant: { type: String, required: true },
    content: [{name: {type: String, required: true}, quantity: {type: Number, required: true}}],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    fee: { type: Number, required: true },
    total: { type: Number, required: true },
});

// Create a collection called Order with the schema that we created above
const Order = mongoose.model("Order", orderSchema); 
module.exports = Order;