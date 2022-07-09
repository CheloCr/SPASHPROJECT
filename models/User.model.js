//todo -------------- IMPORTAMOS LIBRERIAS --------------
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs")







//todo -------------- MODELO DE USUARIO --------------
const userSchema = new Schema({
    user_photo:{
        type: String,
        default: "https://w0.peakpx.com/wallpaper/753/644/HD-wallpaper-perfil-cool-tecnologia-thumbnail.jpg" 
    },
    username:{
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
    // address:{
    //     type:String,
    //     Number
    //     zip_code:Number,
    // },
    password: {
        type:String,
        require:true
    }
});




module.exports = model("User", userSchema);
