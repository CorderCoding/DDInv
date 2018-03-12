var mongoose = require("mongoose"),
Schema = mongoose.Schema;

var charSchema = new Schema({
    name: String,
    inventory: [{type:mongoose.Schema.Types.ObjectId, ref: "Item"}],
    containers: [{type:mongoose.Schema.Types.ObjectId, ref: "Container"}],
    player: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

module.exports = mongoose.model("Char", charSchema);