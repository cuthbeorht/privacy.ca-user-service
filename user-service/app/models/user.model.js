const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    userName: String,
    password: String,
    firstName: String,
    lastName: String
}, {
    timestamps: true
});

module.exports = mongoose.model("UserSchema", UserSchema);