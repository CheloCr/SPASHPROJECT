const { Schema, model } = require("mongoose");

// TODO: Clase para los servicios ofrecidos
const serviceSchema = new Schema({
  service_photo:{
        type: String,
        require:true,
        default: "SE AGREGA UNA URL PREDEFINIDA PARA QUE APAREZCA AL MOMENTO DE REGISTRO" 
    },
  name:String,
  service_type: {
        enum: ["Lavanderia","Tintoreria","Planchaduria"],
        type: String,
        default: "Lavanderia"
     },
   description: String,
   service_pack: {
        type: [{
            size:{
                type: String,
                enum:["3kg","5kg","7kg","10kg"],
            },
            price:{
                type: Number,
                min:200
            }
        }]
     },

price: Number,
_partner_services: [{type:Schema.Types.ObjectId, ref:'Partner'}],// products ofrecidos por el Partner] 

     
     //! confirmar quepasa si colocamos require:true 


  

});

const Service = model("Service", serviceSchema);

module.exports = Service;



product:[{
    img:String, 
    title:String,
    title2:String,
    price:Number,
    description:String,
}]