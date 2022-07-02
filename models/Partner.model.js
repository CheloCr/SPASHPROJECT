const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const partnerSchema = new Schema({
  partner_photo :{
    type: String,
    require:true,
    default: "SE AGREGA UNA URL PREDEFINIDA PARA QUE APAREZCA AL MOMENTO DE REGISTRO"

  },
  name:{
    type: String,
    require:true
  },

  phone_number:{
    type:Number,
    require:true
  },
  password: {
    type:String,
    require:true
  },
  open_hours:{
    type:String,
    require:true
  }
});

const Partner = model("Partner", partnerSchema);

module.exports = Partner;
