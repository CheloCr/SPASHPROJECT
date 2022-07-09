//todo -------------- IMPORTACIONES --------------
const mongoose = require("mongoose")

//todo ----SETEO BASE DE DATO --------------

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/splashproject1";

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
})
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


  module.exports = MONGO_URI
