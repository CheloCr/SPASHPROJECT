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
        enum: ["Lavanderia","Tontoreria","planchaduria"],
        type: String,
        default: "Lavanderia"
     },
   description: String,
   service_pack: {
        type: [{
            size:{
                type: String,
                enum:["CH","M","G","XL"],
                default:"M"
            
            },
            price:{
                type: Number,
                min:200
            }
        }]
     },
     //! _id PROVEEDOR??? dEBE DEIR AQUI?  
     //! confirmar quepasa si colocamos require:true 


  

});

const Service = model("Service", serviceSchema);

module.exports = Service;
