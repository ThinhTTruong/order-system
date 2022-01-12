const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// We create a schema for a movie
let userSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  privacy: { type: Boolean, required: true },
});

// Create a collection called User with the schema that we created above
const User = mongoose.model("User", userSchema); 
module.exports = User;