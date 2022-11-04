const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // (note: unique here is just an optimization, not a validator!)
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); // this adds a 3rd party plugin which does validate the unique

module.exports = mongoose.model("User", userSchema); //the collection name in MongoDB will be lower case & pluralized (Post => posts)
