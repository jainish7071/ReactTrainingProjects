const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/TodoApp?readPreference=primary&appname=MongoDB%20Compass&ssl=false";
const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connected to Mongo succesfully");
  });
};

module.exports = connectToMongo;
