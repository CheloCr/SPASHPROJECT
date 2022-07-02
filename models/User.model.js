const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
    user_photo:{
        type: String,
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
    email:{
        type:String,
        require:true
    },
    address:{
        street:String,
        number:Number,
        zip_code:Number,
    },
    password:String
});

const User = model("User", userSchema);

module.exports = User;
