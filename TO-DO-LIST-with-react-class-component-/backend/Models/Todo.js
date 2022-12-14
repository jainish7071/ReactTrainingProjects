const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema({
  user : {type : mongoose.Schema.Types.ObjectId , required : true},
  title: { type: String, required: true },
  desc: { type: String, required: true },
});
module.exports = mongoose.model("todo", TodoSchema);
