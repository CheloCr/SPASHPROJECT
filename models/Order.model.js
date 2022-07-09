const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const orderSchema = new Schema({
  total_price:Number,
  order_status:String,
  _user_order: [{type:Schema.Types.ObjectId, ref:'Partner'}],// productos adquiridos por el usuario
});

const Order = model("Order", orderSchema);

module.exports = Order;
