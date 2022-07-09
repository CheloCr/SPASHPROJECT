const mongoose = require("mongoose")

// seteamos la Base de Datos

const MONGO_URI = "mongodb://localhost/splashproject1";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

