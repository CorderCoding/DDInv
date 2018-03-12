var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var itemSchema = new Schema({
    name: String,
    weight: Number,
    value: Number,
    rarity: String,
    isMagical:  {type: Boolean, default: false},
    requiresAttunement:  {type: Boolean, default: false},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: "Char"}
});

module.exports = mongoose.model("Item", itemSchema);