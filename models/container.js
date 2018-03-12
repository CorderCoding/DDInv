var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var containerSchema = new Schema({
    name: String,
    weight: Number,
    value: Number,
    rarity: String,
    carryCap: Number,
    isMagical:  {type: Boolean, default: false},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "Char"},
    items: [{type: mongoose.Schema.Types.ObjectId, ref: "Item"}]
});

module.exports = mongoose.model("Container", containerSchema);