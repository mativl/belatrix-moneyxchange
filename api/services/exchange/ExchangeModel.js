const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exchangeSchema = new Schema({
  base: { 
    type: String, 
    required: true, 
    unique: true
  },
  rates: Schema.Types.Mixed,
  date: { type: Date },
});

module.exports = mongoose.model("exchange", exchangeSchema);